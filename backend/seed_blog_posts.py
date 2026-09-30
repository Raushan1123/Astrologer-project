"""
Self-healing blog seed data.

Runs automatically from main.py's startup event on every boot (see
startup_event() -> asyncio.create_task(seed_blog_posts(db))). No manual
script or command is needed - deploying the backend is enough:

  - Backfills a `slug` onto any existing blog post that doesn't have one
    yet (derived from its title), so old posts stop relying on their raw
    UUID for the URL.
  - Inserts the posts in NEW_POSTS if they aren't already in the
    collection (matched by title, so this is safe to run on every
    restart - it will never insert duplicates).

Keep slugify() here in sync with the identical copy in main.py.
"""
import re
import uuid
import logging

logger = logging.getLogger(__name__)


def slugify(text: str) -> str:
    """Convert a title into a URL-friendly, SEO-safe slug."""
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text).strip("-")
    return text[:80].rstrip("-")


async def _unique_slug(db, desired_slug: str, exclude_id: str = None) -> str:
    base = slugify(desired_slug) or "post"
    slug = base
    counter = 2
    while True:
        query = {"slug": slug}
        if exclude_id:
            query["id"] = {"$ne": exclude_id}
        existing = await db.blog_posts.find_one(query, {"_id": 0, "id": 1})
        if not existing:
            return slug
        slug = f"{base}-{counter}"
        counter += 1


async def _backfill_existing_slugs(db):
    missing = await db.blog_posts.find(
        {"$or": [{"slug": {"$exists": False}}, {"slug": None}, {"slug": ""}]},
        {"_id": 0, "id": 1, "title": 1},
    ).to_list(200)
    for post in missing:
        slug = await _unique_slug(db, post["title"], exclude_id=post["id"])
        await db.blog_posts.update_one({"id": post["id"]}, {"$set": {"slug": slug}})
        logger.info(f"Blog seed: backfilled slug '{slug}' onto existing post {post['id']}")


NEW_POSTS = [
    {
        "slug": "vedic-astrology-ghaziabad-complete-guide",
        "title": "Vedic Astrology in Ghaziabad: A Complete Guide to Consultations, Kundli Reading & Birth Chart Analysis",
        "excerpt": "A complete guide to Vedic astrology in Ghaziabad — what happens in a real consultation, how kundli reading and birth chart analysis work, and how to choose an astrologer you can trust.",
        "category": "Astrology Basics",
        "read_time": "9 min read",
        "image": "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80&fm=webp&fit=crop&auto=format",
        "date": "2026-09-29",
        "content": """<div class="blog-content">
<div class="space-y-6">

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    If you've typed "Vedic astrology Ghaziabad" or "kundli reading near me" into Google, you're probably standing at some kind of crossroads — a career decision, a marriage proposal, a health worry, or just a sense that you want more clarity before making a big move.
  </p>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    This guide walks you through what Vedic astrology actually is, what happens in a real consultation, how kundli reading and birth chart analysis work, and how to choose someone you can trust — whether you're in Ghaziabad, Delhi NCR, or anywhere else in India.
  </p>

  <h2 class="text-3xl font-bold text-purple-900 mt-10 mb-5">What Is Vedic Astrology (Jyotish)?</h2>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    Vedic astrology, known in Sanskrit as <strong class="text-purple-900 font-semibold">Jyotish</strong> ("science of light"), is an ancient Indian system that studies the positions of planets, the moon's lunar mansions (nakshatras), and time cycles (dashas) to understand personality, timing, and life patterns.
  </p>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    It's built around your <strong class="text-purple-900 font-semibold">birth chart</strong> — a map of where the sun, moon, and planets were positioned at the exact moment and place you were born. Astrologers use this chart to study:
  </p>

  <ul class="space-y-3 mb-8 ml-6">
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">Career and finances</strong> – suited fields, timing of growth or setbacks</li>
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">Marriage and relationships</strong> – compatibility, timing, family life</li>
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">Health tendencies</strong> – general vulnerabilities to watch for</li>
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">Major life timing</strong> – through planetary periods called dashas and transits</li>
  </ul>

  <h3 class="text-xl font-bold text-purple-900 mt-8 mb-4">How It's Different from Western Astrology</h3>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">The most common confusion is between Vedic and Western (Tropical) astrology.</p>

  <div class="overflow-x-auto my-8 rounded-lg shadow-sm border border-purple-100">
    <table class="w-full text-left border-collapse">
      <thead class="bg-purple-100">
        <tr>
          <th class="p-4 font-bold text-purple-900 border-b border-purple-200">Aspect</th>
          <th class="p-4 font-bold text-purple-900 border-b border-purple-200">Vedic Astrology</th>
          <th class="p-4 font-bold text-purple-900 border-b border-purple-200">Western Astrology</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-purple-100">
          <td class="p-4 text-gray-700 font-medium">Zodiac system</td>
          <td class="p-4 text-gray-700">Sidereal (adjusted for the stars' actual position)</td>
          <td class="p-4 text-gray-700">Tropical (fixed to seasons)</td>
        </tr>
        <tr class="border-b border-purple-100 bg-purple-50/40">
          <td class="p-4 text-gray-700 font-medium">Core tool</td>
          <td class="p-4 text-gray-700">Detailed birth chart + dasha timing</td>
          <td class="p-4 text-gray-700">Sun sign + planetary transits</td>
        </tr>
        <tr class="border-b border-purple-100">
          <td class="p-4 text-gray-700 font-medium">Focus</td>
          <td class="p-4 text-gray-700">Karma, timing of events, remedies</td>
          <td class="p-4 text-gray-700">Personality traits, general trends</td>
        </tr>
        <tr class="bg-purple-50/40">
          <td class="p-4 text-gray-700 font-medium">Time precision needed</td>
          <td class="p-4 text-gray-700">Exact birth time is critical</td>
          <td class="p-4 text-gray-700">Less critical for basic readings</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="bg-purple-50 border-l-4 border-purple-600 p-6 my-8 rounded-r-lg">
    <p class="text-gray-700 leading-relaxed italic">
      Because Vedic astrology relies on precise timing, your exact birth time, date, and place matter a great deal.
    </p>
  </div>

  <h2 class="text-3xl font-bold text-purple-900 mt-10 mb-5">When Should You Consult a Vedic Astrologer?</h2>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    People usually reach out for astrology consultation in Ghaziabad and across India during specific moments, such as:
  </p>

  <ul class="space-y-3 mb-8 ml-6">
    <li class="text-gray-700 leading-relaxed">✓ Before finalising a <strong class="text-purple-900">marriage proposal</strong> or resolving relationship confusion</li>
    <li class="text-gray-700 leading-relaxed">✓ When facing a <strong class="text-purple-900">career crossroads</strong> — job change, business decision, or repeated setbacks</li>
    <li class="text-gray-700 leading-relaxed">✓ During <strong class="text-purple-900">health concerns</strong> that don't have a clear pattern</li>
    <li class="text-gray-700 leading-relaxed">✓ Before starting something new — a business, a property purchase, or an important event</li>
    <li class="text-gray-700 leading-relaxed">✓ When going through a difficult planetary period (commonly discussed as "Sade Sati" or a tough dasha)</li>
    <li class="text-gray-700 leading-relaxed">✓ Simply out of curiosity to understand one's own strengths and challenges</li>
  </ul>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    Astrology isn't a substitute for professional medical, legal, or financial advice — think of it as an additional lens for perspective and timing, alongside expert advice in those specific fields.
  </p>

  <h2 class="text-3xl font-bold text-purple-900 mt-10 mb-5">What Happens During a Vedic Astrology Consultation in Ghaziabad?</h2>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    A typical consultation — whether in person in Ghaziabad or online — follows a fairly consistent structure:
  </p>

  <ul class="space-y-3 mb-8 ml-6">
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">Details collection</strong> – your date, time, and place of birth</li>
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">Chart preparation</strong> – the astrologer generates your birth chart (kundli)</li>
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">Discussion of your specific concern</strong> – marriage, career, health, business, etc.</li>
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">Analysis of relevant planets and houses</strong> tied to your question</li>
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">Discussion of timing</strong> – when things are likely to improve or need caution</li>
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">Remedies, if suggested</strong> – gemstone suggestions, mantras, or simple lifestyle adjustments</li>
  </ul>

  <h3 class="text-xl font-bold text-purple-900 mt-8 mb-4">Kundli Reading Explained</h3>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    A <strong class="text-purple-900 font-semibold">kundli</strong> (also spelled "kundali") is your Vedic birth chart — a diagram dividing the sky at your birth moment into 12 sections called <strong class="text-purple-900 font-semibold">houses</strong>, each governing a different area of life. Kundli reading means interpreting which zodiac sign and planet occupies each house, how planets aspect (influence) one another, your current and upcoming dasha (planetary period), and special combinations called yogas that can indicate specific life outcomes.
  </p>

  <h3 class="text-xl font-bold text-purple-900 mt-8 mb-4">Birth Chart Analysis: What Astrologers Look At</h3>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    Here's a simplified view of what the 12 houses generally represent in a birth chart analysis:
  </p>

  <div class="overflow-x-auto my-8 rounded-lg shadow-sm border border-purple-100">
    <table class="w-full text-left border-collapse">
      <thead class="bg-purple-100">
        <tr>
          <th class="p-4 font-bold text-purple-900 border-b border-purple-200">House</th>
          <th class="p-4 font-bold text-purple-900 border-b border-purple-200">Life Area</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-purple-100"><td class="p-4 text-gray-700 font-medium">1st</td><td class="p-4 text-gray-700">Self, personality, health</td></tr>
        <tr class="border-b border-purple-100 bg-purple-50/40"><td class="p-4 text-gray-700 font-medium">2nd</td><td class="p-4 text-gray-700">Wealth, family, speech</td></tr>
        <tr class="border-b border-purple-100"><td class="p-4 text-gray-700 font-medium">3rd</td><td class="p-4 text-gray-700">Courage, siblings, communication</td></tr>
        <tr class="border-b border-purple-100 bg-purple-50/40"><td class="p-4 text-gray-700 font-medium">4th</td><td class="p-4 text-gray-700">Home, mother, emotional comfort</td></tr>
        <tr class="border-b border-purple-100"><td class="p-4 text-gray-700 font-medium">5th</td><td class="p-4 text-gray-700">Children, education, creativity</td></tr>
        <tr class="border-b border-purple-100 bg-purple-50/40"><td class="p-4 text-gray-700 font-medium">6th</td><td class="p-4 text-gray-700">Health issues, debts, daily work, obstacles</td></tr>
        <tr class="border-b border-purple-100"><td class="p-4 text-gray-700 font-medium">7th</td><td class="p-4 text-gray-700">Marriage, partnerships, business tie-ups</td></tr>
        <tr class="border-b border-purple-100 bg-purple-50/40"><td class="p-4 text-gray-700 font-medium">8th</td><td class="p-4 text-gray-700">Transformation, longevity, unexpected events</td></tr>
        <tr class="border-b border-purple-100"><td class="p-4 text-gray-700 font-medium">9th</td><td class="p-4 text-gray-700">Luck, higher learning, father, dharma</td></tr>
        <tr class="border-b border-purple-100 bg-purple-50/40"><td class="p-4 text-gray-700 font-medium">10th</td><td class="p-4 text-gray-700">Career, public image, authority</td></tr>
        <tr class="border-b border-purple-100"><td class="p-4 text-gray-700 font-medium">11th</td><td class="p-4 text-gray-700">Income, gains, social circle</td></tr>
        <tr class="bg-purple-50/40"><td class="p-4 text-gray-700 font-medium">12th</td><td class="p-4 text-gray-700">Losses, expenses, foreign connections, spirituality</td></tr>
      </tbody>
    </table>
  </div>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    A skilled astrologer doesn't read houses in isolation — they look at how planets, houses, and current dasha periods interact together before forming a prediction.
  </p>

  <h2 class="text-3xl font-bold text-purple-900 mt-10 mb-5">Online vs In-Person Astrology Consultation in Ghaziabad</h2>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">Both formats are commonly available today. Here's how they compare:</p>

  <div class="overflow-x-auto my-8 rounded-lg shadow-sm border border-purple-100">
    <table class="w-full text-left border-collapse">
      <thead class="bg-purple-100">
        <tr>
          <th class="p-4 font-bold text-purple-900 border-b border-purple-200">Factor</th>
          <th class="p-4 font-bold text-purple-900 border-b border-purple-200">In-Person (Ghaziabad)</th>
          <th class="p-4 font-bold text-purple-900 border-b border-purple-200">Online Consultation</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-purple-100">
          <td class="p-4 text-gray-700 font-medium">Best for</td>
          <td class="p-4 text-gray-700">Detailed, longer sessions; remedies that need in-person guidance</td>
          <td class="p-4 text-gray-700">Convenience, clients outside Ghaziabad/NCR</td>
        </tr>
        <tr class="border-b border-purple-100 bg-purple-50/40">
          <td class="p-4 text-gray-700 font-medium">Availability</td>
          <td class="p-4 text-gray-700">Limited to office hours/location</td>
          <td class="p-4 text-gray-700">Often more flexible scheduling</td>
        </tr>
        <tr class="border-b border-purple-100">
          <td class="p-4 text-gray-700 font-medium">Reach</td>
          <td class="p-4 text-gray-700">Local clients</td>
          <td class="p-4 text-gray-700">Clients anywhere in India (and abroad)</td>
        </tr>
        <tr class="bg-purple-50/40">
          <td class="p-4 text-gray-700 font-medium">Personal comfort</td>
          <td class="p-4 text-gray-700">Face-to-face reassurance</td>
          <td class="p-4 text-gray-700">Privacy from home</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 my-8">
    <p class="text-gray-700 text-lg leading-relaxed italic">
      Neither format is inherently "more accurate" — what matters is the astrologer's method and the accuracy of your birth details, not whether the session happens in a room or on a call.
    </p>
  </div>

  <h2 class="text-3xl font-bold text-purple-900 mt-10 mb-5">How to Prepare for Your Consultation</h2>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">To get a meaningful reading, come prepared with:</p>

  <ul class="space-y-3 mb-8 ml-6">
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">Exact date of birth</strong></li>
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">Exact time of birth</strong> (check your birth certificate or hospital record — even a 15–20 minute error can shift house placements)</li>
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">Place of birth</strong> (city is usually sufficient)</li>
    <li class="text-gray-700 leading-relaxed">✓ A <strong class="text-purple-900">clear, specific question</strong> — "Should I take this job offer?" gets a more useful answer than "Tell me my future"</li>
    <li class="text-gray-700 leading-relaxed">✓ Any relevant background, if it's a repeat or follow-up consultation</li>
  </ul>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    If you genuinely don't know your birth time, say so upfront — a good astrologer will tell you honestly how that limits the reading rather than guessing.
  </p>

  <h2 class="text-3xl font-bold text-purple-900 mt-10 mb-5">How to Choose a Genuine Vedic Astrologer in Ghaziabad or India</h2>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">With so many options online and locally, a few practical checks help:</p>

  <ul class="space-y-3 mb-8 ml-6">
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">They ask for exact birth details before predicting anything.</strong> Anyone offering firm predictions without your birth time/place is skipping a foundational step.</li>
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">They explain their reasoning</strong>, at least in simple terms, rather than only stating conclusions.</li>
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">They avoid guaranteeing outcomes</strong> on sensitive matters like marriage, health, or legal cases — astrology speaks in probabilities and timing, not certainties.</li>
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">Remedies are reasonable and proportionate.</strong> Be cautious of anyone pushing expensive, ongoing, high-pressure "remedy packages."</li>
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">They're clear on consultation format, timing, and any fees</strong> before you begin.</li>
  </ul>

  <h2 class="text-3xl font-bold text-purple-900 mt-10 mb-5">Vedic Astrology Consultation with Acharyaa Indira Pandey (Happy Kismat)</h2>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    Acharyaa Indira Pandey offers Vedic astrology consultations for clients in Ghaziabad and across India through <a href="https://www.happykismat.com/" target="_blank" class="text-purple-700 hover:underline font-medium">Happy Kismat</a>, covering birth chart analysis, kundli reading, and guidance on marriage, career, business, and health-related questions.
  </p>

  <h2 class="text-3xl font-bold text-purple-900 mt-10 mb-5">Final Thoughts</h2>

  <p class="text-lg text-gray-700 leading-relaxed mb-8">
    Vedic astrology works best when it's used as a tool for clarity and timing — not as a substitute for your own judgment or professional expertise in health, legal, and financial matters. A good consultation should leave you with a clearer understanding of your chart and your options, not just a list of predictions.
  </p>

  <h2 class="text-3xl font-bold text-purple-900 mt-10 mb-6">FAQs</h2>

  <div class="space-y-5 mb-10">
    <div class="bg-white border border-purple-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 class="text-xl font-bold text-purple-900 mb-3">Is Vedic astrology scientifically proven?</h3>
      <p class="text-gray-700 leading-relaxed">Vedic astrology is a traditional belief system rooted in ancient Indian texts, not a field validated by modern empirical science. Many people find value in it for reflection, guidance, and timing decisions; it's best approached as a complementary perspective rather than a replacement for professional advice in medical, legal, or financial matters.</p>
    </div>
    <div class="bg-white border border-purple-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 class="text-xl font-bold text-purple-900 mb-3">What details do I need for an accurate kundli reading?</h3>
      <p class="text-gray-700 leading-relaxed">Your exact date, time, and place of birth. Birth time is especially important, since it determines your ascendant (rising sign) and house placements.</p>
    </div>
    <div class="bg-white border border-purple-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 class="text-xl font-bold text-purple-900 mb-3">Can astrology predict exact dates for events like marriage or job change?</h3>
      <p class="text-gray-700 leading-relaxed">Most experienced astrologers give time windows (based on dasha periods and transits) rather than exact dates, since Vedic astrology deals with probable timing, not certainties.</p>
    </div>
    <div class="bg-white border border-purple-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 class="text-xl font-bold text-purple-900 mb-3">How is kundli reading different from birth chart analysis?</h3>
      <p class="text-gray-700 leading-relaxed">They're closely related — "kundli reading" typically refers to the overall interpretation session, while "birth chart analysis" refers to the technical study of house and planet placements that forms the basis of that reading.</p>
    </div>
    <div class="bg-white border border-purple-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 class="text-xl font-bold text-purple-900 mb-3">Is online astrology consultation as effective as an in-person one in Ghaziabad?</h3>
      <p class="text-gray-700 leading-relaxed">Yes, as long as your birth details are accurate. The medium (in-person or online) doesn't change the astrological calculations — it only affects convenience and personal comfort.</p>
    </div>
    <div class="bg-white border border-purple-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 class="text-xl font-bold text-purple-900 mb-3">How often should I consult an astrologer?</h3>
      <p class="text-gray-700 leading-relaxed">There's no fixed rule. Many people consult once for a specific concern, then return during major life transitions (marriage, career change, health issues) rather than on a routine schedule.</p>
    </div>
  </div>

  <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8 text-center my-10 shadow-lg">
    <h3 class="text-2xl font-bold mb-3">Ready for a Detailed, Birth-Chart-Based Reading?</h3>
    <p class="text-lg mb-5 text-purple-50">Explore kundli reading and astrology consultation options with Acharyaa Indira Pandey</p>
    <a href="https://www.happykismat.com/booking" target="_blank"
       class="inline-block bg-white text-purple-700 font-bold px-8 py-3 rounded-lg text-lg hover:bg-purple-50 transition-colors shadow-md">
      Book Your Consultation
    </a>
  </div>

</div>
</div>""",
    },
    {
        "slug": "marriage-business-health-career-astrology-ghaziabad",
        "title": "Marriage, Business, Health & Career Astrology Predictions in Ghaziabad: What to Expect",
        "excerpt": "How Vedic astrology approaches marriage, business, health, and career questions in Ghaziabad — what a real consultation covers, and what's reasonable to expect from a prediction.",
        "category": "Astrology Basics",
        "read_time": "9 min read",
        "image": "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80&fm=webp&fit=crop&auto=format",
        "date": "2026-09-30",
        "content": """<div class="blog-content">
<div class="space-y-6">

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    Most people don't consult an astrologer out of idle curiosity — they come with a specific decision on their mind: a marriage proposal to accept or decline, a business to start, a health worry that won't go away, or a career move that feels risky.
  </p>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    This guide breaks down how Vedic astrology approaches each of these four areas — marriage, business, health, and career — what a real consultation covers, and what's reasonable to expect (and what isn't) from an astrology prediction in Ghaziabad or anywhere in India.
  </p>

  <h2 class="text-3xl font-bold text-purple-900 mt-10 mb-5">Why People in Ghaziabad Seek Astrology for Life's Biggest Decisions</h2>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    Ghaziabad, as part of the Delhi NCR belt, has a mix of traditional families and a fast-moving professional population. It's common for both to turn to astrology at similar moments:
  </p>

  <ul class="space-y-3 mb-8 ml-6">
    <li class="text-gray-700 leading-relaxed">✓ Before finalising an <strong class="text-purple-900">arranged marriage</strong> match</li>
    <li class="text-gray-700 leading-relaxed">✓ When <strong class="text-purple-900">two businesses or partners</strong> are considering working together</li>
    <li class="text-gray-700 leading-relaxed">✓ During <strong class="text-purple-900">unexplained health struggles</strong></li>
    <li class="text-gray-700 leading-relaxed">✓ When choosing between <strong class="text-purple-900">job offers, career switches, or entrepreneurship</strong></li>
  </ul>

  <div class="bg-purple-50 border-l-4 border-purple-600 p-6 my-8 rounded-r-lg">
    <p class="text-gray-700 leading-relaxed italic">
      The common thread is timing and clarity — people generally aren't looking for a guarantee, they're looking for a second lens on a decision they're already weighing.
    </p>
  </div>

  <h2 class="text-3xl font-bold text-purple-900 mt-10 mb-5">Marriage Astrology Predictions in Ghaziabad</h2>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    Marriage is one of the most common reasons people search for astrology consultation in India, and it's usually approached in one of two ways: matching two charts, or understanding one person's marriage timing and prospects.
  </p>

  <h3 class="text-xl font-bold text-purple-900 mt-8 mb-4">Kundli Milan (Guna Milan) Explained</h3>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    <strong class="text-purple-900 font-semibold">Kundli Milan</strong>, also called <strong class="text-purple-900 font-semibold">Guna Milan</strong>, is the traditional compatibility-matching process between two birth charts, most often used before finalising an arranged marriage. It's scored out of <strong class="text-purple-900 font-semibold">36 points (gunas)</strong>, based on eight categories covering temperament, mental compatibility, health, and more.
  </p>

  <ul class="space-y-3 mb-8 ml-6">
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">18+ points</strong> is generally considered an acceptable match</li>
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">Below 18</strong> doesn't automatically mean incompatibility — a good astrologer looks at which specific gunas are weak, since some matter more than others depending on the couple's charts</li>
  </ul>

  <h3 class="text-xl font-bold text-purple-900 mt-8 mb-4">Manglik Dosha and Compatibility</h3>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    <strong class="text-purple-900 font-semibold">Manglik Dosha</strong> (also called Mangal Dosha) refers to a placement of Mars in specific houses of the birth chart, which is traditionally believed to affect marital harmony. It's one of the most searched — and most misunderstood — topics in marriage astrology.
  </p>

  <ul class="space-y-3 mb-8 ml-6">
    <li class="text-gray-700 leading-relaxed">✓ Being "Manglik" is common; it isn't automatically a serious problem</li>
    <li class="text-gray-700 leading-relaxed">✓ Its effect depends on <strong class="text-purple-900">both partners' charts</strong>, not one chart in isolation</li>
    <li class="text-gray-700 leading-relaxed">✓ Many traditional systems consider it neutralised when <strong class="text-purple-900">both partners are Manglik</strong>, or through specific remedial measures</li>
    <li class="text-gray-700 leading-relaxed">✓ A one-line "Manglik/Not Manglik" answer without deeper chart analysis isn't a complete assessment</li>
  </ul>

  <h3 class="text-xl font-bold text-purple-900 mt-8 mb-4">What a Marriage Astrology Consultation Covers</h3>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">A thorough marriage-focused consultation in Ghaziabad typically looks at:</p>

  <ul class="space-y-3 mb-8 ml-6">
    <li class="text-gray-700 leading-relaxed">✓ The <strong class="text-purple-900">7th house</strong> (marriage and partnerships) and its ruling planet</li>
    <li class="text-gray-700 leading-relaxed">✓ <strong class="text-purple-900">Venus and Jupiter</strong> placements (relationships and marital happiness)</li>
    <li class="text-gray-700 leading-relaxed">✓ Current and upcoming <strong class="text-purple-900">dasha periods</strong> relevant to marriage timing</li>
    <li class="text-gray-700 leading-relaxed">✓ Compatibility factors if two charts are being matched</li>
    <li class="text-gray-700 leading-relaxed">✓ General guidance on family dynamics and adjustment, where relevant</li>
  </ul>

  <h2 class="text-3xl font-bold text-purple-900 mt-10 mb-5">Business Astrology Consultation Ghaziabad</h2>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    Entrepreneurs and business owners in Ghaziabad often consult astrology at three key moments: before starting a venture, before entering a partnership, and during a rough financial patch.
  </p>

  <h3 class="text-xl font-bold text-purple-900 mt-8 mb-4">Best Time to Start a Business (Muhurat)</h3>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    Choosing an auspicious date and time — a <strong class="text-purple-900 font-semibold">muhurat</strong> — for registering a business, signing an agreement, or launching a product is a common practice. This is calculated based on favourable planetary transits at the time, avoiding periods considered inauspicious, and the individual's personal birth chart when a highly customised muhurat is wanted.
  </p>

  <h3 class="text-xl font-bold text-purple-900 mt-8 mb-4">Partnership Compatibility</h3>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    Just as marriage compatibility is checked between two people, business partnership compatibility looks at how two (or more) partners' charts interact — particularly around the <strong class="text-purple-900">7th house</strong> (partnerships), <strong class="text-purple-900">10th house</strong> (career/authority), and <strong class="text-purple-900">11th house</strong> (gains).
  </p>

  <div class="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-purple-500">
    <h4 class="text-lg font-bold text-purple-900 mb-3">Common Questions Entrepreneurs Ask</h4>
    <p class="text-gray-700 leading-relaxed">"Is this the right time to start my business, or should I wait?" · "Will this partnership work out long-term?" · "Why does my business face repeated obstacles despite hard work?" · "What sectors or business types suit my chart?"</p>
  </div>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    A grounded astrology consultation treats these as <strong class="text-purple-900">timing and tendency questions</strong> — it should complement solid business planning, market research, and financial advice, not replace them.
  </p>

  <h2 class="text-3xl font-bold text-purple-900 mt-10 mb-5">Health Astrology Predictions in Ghaziabad</h2>

  <div class="bg-purple-50 border-l-4 border-purple-600 p-6 my-8 rounded-r-lg">
    <p class="text-gray-700 leading-relaxed italic">
      Health is a sensitive area, and it's worth being clear upfront: Vedic astrology is not a diagnostic or medical tool, and it should never replace a doctor's advice, diagnosis, or treatment.
    </p>
  </div>

  <h3 class="text-xl font-bold text-purple-900 mt-8 mb-4">What Vedic Astrology Can Reasonably Offer</h3>

  <ul class="space-y-3 mb-8 ml-6">
    <li class="text-gray-700 leading-relaxed">✓ The <strong class="text-purple-900">1st house</strong> (overall vitality) and <strong class="text-purple-900">6th house</strong> (illness, daily struggles)</li>
    <li class="text-gray-700 leading-relaxed">✓ Planets associated with specific body areas or systems in classical texts</li>
    <li class="text-gray-700 leading-relaxed">✓ Periods (dashas/transits) traditionally associated with <strong class="text-purple-900">higher caution or stress on health</strong></li>
    <li class="text-gray-700 leading-relaxed">✓ General lifestyle and preventive suggestions tied to planetary periods</li>
  </ul>

  <h3 class="text-xl font-bold text-purple-900 mt-8 mb-4">What It Should Not Be Used For</h3>

  <ul class="space-y-3 mb-8 ml-6">
    <li class="text-gray-700 leading-relaxed">✗ Diagnosing a specific illness or condition</li>
    <li class="text-gray-700 leading-relaxed">✗ Replacing medical tests, second opinions, or a doctor's treatment plan</li>
    <li class="text-gray-700 leading-relaxed">✗ Delaying necessary medical care while waiting for a "better time"</li>
  </ul>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    If you're facing a real health concern, see a qualified doctor first — astrology can, at most, sit alongside that care as a source of general perspective on timing and lifestyle, never in place of it.
  </p>

  <h2 class="text-3xl font-bold text-purple-900 mt-10 mb-5">Astrological Career Guidance in Ghaziabad</h2>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">Career questions are among the most practical use cases for astrology, since they're closely tied to timing.</p>

  <h3 class="text-xl font-bold text-purple-900 mt-8 mb-4">Choosing a Career Direction</h3>

  <ul class="space-y-3 mb-8 ml-6">
    <li class="text-gray-700 leading-relaxed">✓ The <strong class="text-purple-900">10th house</strong> (career, public standing) and its lord</li>
    <li class="text-gray-700 leading-relaxed">✓ Strength of planets like <strong class="text-purple-900">Saturn</strong> (discipline, structure), <strong class="text-purple-900">Mercury</strong> (communication, trade), and <strong class="text-purple-900">Jupiter</strong> (teaching, advisory, growth)</li>
    <li class="text-gray-700 leading-relaxed">✓ Yogas (planetary combinations) associated with specific fields — government service, business, creative work, and so on</li>
  </ul>

  <h3 class="text-xl font-bold text-purple-900 mt-8 mb-4">Job Change and Timing Questions</h3>

  <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 my-8">
    <p class="text-gray-700 text-lg leading-relaxed italic">
      "Is this the right time to switch jobs?" · "Why do I feel stuck despite working hard?" · "Will my current dasha period support career growth?" — these are usually addressed by mapping your current planetary period (dasha) against the strength and placement of your 10th house lord and related planets.
    </p>
  </div>

  <h2 class="text-3xl font-bold text-purple-900 mt-10 mb-5">How These Consultations Work with Acharyaa Indira Pandey (Happy Kismat)</h2>

  <p class="text-lg text-gray-700 leading-relaxed mb-6">
    Acharyaa Indira Pandey provides consultations covering marriage matching, business timing, health-related guidance, and career direction for clients in Ghaziabad and across India through <a href="https://www.happykismat.com/" target="_blank" class="text-purple-700 hover:underline font-medium">Happy Kismat</a>, based on detailed birth chart analysis rather than generic, one-size-fits-all predictions.
  </p>

  <h2 class="text-3xl font-bold text-purple-900 mt-10 mb-6">FAQs</h2>

  <div class="space-y-5 mb-10">
    <div class="bg-white border border-purple-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 class="text-xl font-bold text-purple-900 mb-3">Is Manglik Dosha always a problem in marriage matching?</h3>
      <p class="text-gray-700 leading-relaxed">No. Being Manglik is fairly common, and its impact depends on both partners' full charts, not a single factor viewed in isolation. A proper analysis looks at the complete picture before drawing conclusions.</p>
    </div>
    <div class="bg-white border border-purple-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 class="text-xl font-bold text-purple-900 mb-3">Can astrology tell me the exact date my business will succeed?</h3>
      <p class="text-gray-700 leading-relaxed">No. Astrology can point to generally favourable or challenging periods (through dashas and transits) for a venture, but success also depends on planning, market conditions, and execution — astrology is one input among many, not a guarantee.</p>
    </div>
    <div class="bg-white border border-purple-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 class="text-xl font-bold text-purple-900 mb-3">Can an astrologer diagnose a health condition?</h3>
      <p class="text-gray-700 leading-relaxed">No. Astrology can highlight general periods of caution based on planetary influences, but it is not a substitute for medical diagnosis or treatment. Always consult a qualified doctor for health concerns.</p>
    </div>
    <div class="bg-white border border-purple-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 class="text-xl font-bold text-purple-900 mb-3">What is the ideal Guna Milan score for marriage matching?</h3>
      <p class="text-gray-700 leading-relaxed">A score of 18 or above out of 36 is generally considered acceptable in traditional Kundli Milan, though which specific gunas match matters as much as the total score.</p>
    </div>
    <div class="bg-white border border-purple-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 class="text-xl font-bold text-purple-900 mb-3">How do I know if it's the right time for a career change?</h3>
      <p class="text-gray-700 leading-relaxed">This is usually assessed by looking at your current dasha (planetary period) alongside the condition of your 10th house and its ruling planet, to see whether the phase generally supports growth or suggests patience.</p>
    </div>
    <div class="bg-white border border-purple-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 class="text-xl font-bold text-purple-900 mb-3">Do I need both partners' birth details for marriage or business compatibility?</h3>
      <p class="text-gray-700 leading-relaxed">Yes. Compatibility analysis — whether for marriage or a business partnership — requires accurate birth details (date, time, and place) for both individuals to be meaningful.</p>
    </div>
  </div>

  <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8 text-center my-10 shadow-lg">
    <h3 class="text-2xl font-bold mb-3">Get Guidance Tailored to Your Chart</h3>
    <p class="text-lg mb-5 text-purple-50">Marriage, business, health, or career — connect with Acharyaa Indira Pandey for a detailed consultation</p>
    <a href="https://www.happykismat.com/booking" target="_blank"
       class="inline-block bg-white text-purple-700 font-bold px-8 py-3 rounded-lg text-lg hover:bg-purple-50 transition-colors shadow-md">
      Book Your Consultation
    </a>
  </div>

</div>
</div>""",
    }
]


async def seed_blog_posts(db):
    """Idempotent: safe to call on every startup. Never raises - errors are
    logged so a seeding problem can't block the app from booting.

    Insert-or-refresh: a post already on this slug+title gets its editorial
    fields (content, excerpt, image, category, read_time) synced to whatever
    is defined in NEW_POSTS below - so editing the HTML in this file (e.g.
    reformatting/beautifying a post) reaches production on the *next*
    deploy automatically. Its id, slug and original publish date are never
    touched, so the post's URL and position in the blog list stay stable -
    this only ever updates content in place, never re-inserts or duplicates.
    """
    try:
        await _backfill_existing_slugs(db)

        for post in NEW_POSTS:
            # Idempotency is checked by TITLE, not slug: on an earlier boot
            # this exact post may have been de-duped onto a slug other than
            # its "desired" one below (e.g. '...-2', if a different post was
            # already sitting on the desired slug at the time). Looking it
            # up by desired slug would miss it and insert a duplicate.
            existing = await db.blog_posts.find_one({"title": post["title"]}, {"_id": 0})

            if existing:
                # Same post as a previous boot - refresh its content in
                # place if this file's copy has changed since, but never
                # touch its id, its actual (possibly de-duped) slug, or
                # its original publish date.
                refreshed_fields = {
                    "excerpt": post["excerpt"],
                    "content": post["content"],
                    "image": post["image"],
                    "category": post["category"],
                    "read_time": post["read_time"],
                    "published": True,
                }
                changed = any(existing.get(k) != v for k, v in refreshed_fields.items())
                if changed:
                    await db.blog_posts.update_one(
                        {"id": existing["id"]}, {"$set": refreshed_fields}
                    )
                    logger.info(f"Blog seed: refreshed content for '{post['title'][:50]}'")
                continue

            # Not present yet under any slug - this is genuinely new.
            desired_slug = post["slug"]
            slug_taken_by = await db.blog_posts.find_one(
                {"slug": desired_slug}, {"_id": 0, "title": 1}
            )
            if slug_taken_by:
                # A *different*, unrelated post already owns this slug (e.g.
                # an older post targeting the same keyword) - don't touch
                # it, give the new post a de-duped slug instead.
                slug = await _unique_slug(db, desired_slug)
                logger.info(
                    f"Blog seed: '{desired_slug}' already used by "
                    f"{slug_taken_by.get('title', '')[:60]!r} - using '{slug}' instead"
                )
            else:
                slug = desired_slug

            doc = {
                "id": str(uuid.uuid4()),
                "slug": slug,
                "title": post["title"],
                "excerpt": post["excerpt"],
                "content": post["content"],
                "image": post["image"],
                "author": "Acharyaa Indira Pandey",
                "date": post["date"],
                "category": post["category"],
                "read_time": post["read_time"],
                "published": True,
            }
            await db.blog_posts.insert_one(doc)
            logger.info(f"Blog seed: inserted new post -> /blog/{slug}")
    except Exception as e:
        logger.error(f"Error seeding blog posts: {str(e)}")
