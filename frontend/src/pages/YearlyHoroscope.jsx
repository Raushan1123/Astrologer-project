import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Star, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const YearlyHoroscope = () => {
  const [selectedSign, setSelectedSign] = useState('Aries');
  const currentYear = new Date().getFullYear();

  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  const yearlyHoroscopes = {
    Aries: {
      symbol: '♈',
      color: 'from-red-600 to-orange-600',
      overview: `${currentYear} is a year of powerful growth and transformation for Aries. Expect dynamic changes in career, relationships, and personal development. Your leadership qualities will be tested and refined, leading to significant achievements. The year promises success, recognition, and the manifestation of long-held dreams.`,
      q1: 'Q1 (Jan-Mar): Focus on planning and new beginnings. This quarter brings clarity about your goals. Career opportunities emerge. Financial planning bears fruit. Romance may blossom for singles. A good time for major decisions.',
      q2: 'Q2 (Apr-Jun): Implementation phase. Your plans come into action. Projects gain momentum. Professional recognition increases. Financial growth is notable. Travel brings new perspectives. Relationships deepen through shared activities.',
      q3: 'Q3 (Jul-Sep): Consolidation and reflection. Assess progress made so far. Fine-tune strategies. Challenges appear but are surmountable. Personal growth through learning. Health requires attention. Career reaches a turning point.',
      q4: 'Q4 (Oct-Dec): Completion and preparation. Year-end brings results of efforts. Closure on pending matters. Financial year-end is positive. Family matters improve. Prepare mentally and spiritually for the new year.',
      loveOverall: 'An eventful year for relationships. Singles may meet someone significant. Couples experience deeper bonding. Mid-year challenges test relationships but strengthen them. Overall: Positive year for love and commitment.',
      careerOverall: 'Outstanding career year. Promotions, salary increases, or new opportunities arise. Leadership roles come naturally. Your performance stands out. Year-end brings recognition and rewards.',
      healthOverall: 'Generally healthy year. Maintain energy levels with regular exercise. Mid-year requires stress management. Mental health improves through spiritual practices. Avoid overwork in Q2.',
      financialOverall: 'Strong financial year. Income increases through work and investments. Major gains likely in Q2 and Q4. Expenditures are justified. Build emergency fund. Overall prosperity is assured.',
      remedies: ['Perform regular Hanuman Puja', 'Wear red/orange clothing on Tuesdays', 'Donate red items to charity', 'Practice breathing exercises daily', 'Maintain discipline in routine']
    },
    Taurus: {
      symbol: '♉',
      color: 'from-green-600 to-emerald-600',
      overview: `${currentYear} brings stability and material prosperity to Taurus. This is a year for building solid foundations in career and relationships. Financial growth is steady and reliable. Focus on security and long-term plans. A transformative year that sets the stage for future success.`,
      q1: 'Q1 (Jan-Mar): Foundation building. Plan long-term goals. Financial planning is crucial. Relationships stabilize. Career direction becomes clear. A good quarter for major decisions affecting security.',
      q2: 'Q2 (Apr-Jun): Active growth phase. Career advances through steady work. Financial gains through multiple channels. Home improvements bring satisfaction. Relationships deepen through commitment. Travel brings peace.',
      q3: 'Q3 (Jul-Sep): Expansion and opportunities. Unexpected opportunities arise. Career advancement accelerates. Financial portfolio expands. Social circle widens. Learning enhances professional skills.',
      q4: "Q4 (Oct-Dec): Consolidation of gains. Reflect on year's achievements. Financial year-end is positive. Relationships are stronger. Prepare for next year's ventures. Rest and rejuvenate.",
      loveOverall: 'Stable and deepening relationships throughout the year. For couples: Trust and commitment strengthen bonds. For singles: Meeting someone reliable and trustworthy. Long-term relationships flourish.',
      careerOverall: 'Steady career progression. Your reliability earns recognition. Promotions or increased responsibilities likely. Financial benefits accompany career growth. Stability and security are ensured.',
      healthOverall: 'Good health throughout the year. Maintain consistency in health routines. Nutrition and diet play important roles. Physical strength increases. Mental peace aids overall wellness.',
      financialOverall: 'Excellent financial year. Income grows steadily. Investments show good returns. Property values increase. Financial security improves significantly. Build substantial savings.',
      remedies: ['Wear emerald gemstone', 'Water plants daily', 'Keep Venus happy with flowers', 'Help farmers and gardeners', 'Practice gratitude']
    },
    Gemini: {
      symbol: '♊',
      color: 'from-yellow-500 to-orange-500',
      overview: `${currentYear} is a year of communication excellence and intellectual growth for Gemini. Networking and learning will bring remarkable opportunities. Travel and short journeys open doors. This is an ideal year for writing, teaching, and communication-based work. Success through words and ideas.`,
      q1: 'Q1 (Jan-Mar): Communication focus. Important conversations lead to breakthroughs. Writing projects progress well. Travel brings opportunities. Relationships improve through dialogue.',
      q2: 'Q2 (Apr-Jun): Networking phase. Social connections multiply. Travel increases bringing new perspectives. Career advances through communication skills. Learning opportunities peak.',
      q3: 'Q3 (Jul-Sep): Knowledge expansion. Educational pursuits flourish. Intellectual achievements recognized. Career growth through expertise. Teaching and mentoring opportunities arise.',
      q4: 'Q4 (Oct-Dec): Consolidation of knowledge. Gather and organize learning. Communicate achievements. Financial returns from intellectual work. Prepare for specialized pursuits.',
      loveOverall: 'Romance through communication and intellectual connection. For couples: Meaningful conversations strengthen bonds. For singles: Meeting someone witty and intelligent. Relationships based on compatibility.',
      careerOverall: 'Career success through communication skills. Writing, teaching, sales, or media work prospers. Networking leads to advancement. Your ideas are valued and implemented.',
      healthOverall: 'Mental clarity is excellent. Nervous system is balanced. Movement and travel aid wellness. Practice meditation for stress relief. Avoid anxiety through positive thinking.',
      financialOverall: 'Good financial year. Income through communication-based work. Short-term investments show returns. Avoid over-commitments financially. Overall prosperity is solid.',
      remedies: ['Wear yellow/green gemstone', 'Learn something new', 'Communicate honestly', 'Travel for leisure', 'Practice writing']
    },
    Cancer: {
      symbol: '♋',
      color: 'from-blue-600 to-indigo-600',
      overview: `${currentYear} is deeply transformative for Cancer. Home, family, and emotional matters are highlighted. Financial improvements through resourcefulness. This year brings emotional maturity and deepened family bonds. Significant progress in creating emotional security and stability.`,
      q1: 'Q1 (Jan-Mar): Family focus. Home improvements planned. Emotional clarity develops. Family bonding strengthens. Financial matters related to property progress.',
      q2: 'Q2 (Apr-Jun): Emotional growth phase. Creativity peaks. Intuition guides important decisions. Family celebrations occur. Home becomes more beautiful and secure.',
      q3: 'Q3 (Jul-Sep): Relationship deepening. Personal and family relationships strengthen. Support from loved ones aids growth. Career benefits from emotional intelligence.',
      q4: 'Q4 (Oct-Dec): Consolidation and reflection. Family bonds are stronger. Emotional maturity achieved. Financial security improves. Prepare for new ventures with renewed confidence.',
      loveOverall: 'Deep emotional connections flourish. For couples: Vulnerability brings closeness. For singles: Meeting someone emotionally mature. Family relationships improve.',
      careerOverall: 'Career through care-based professions. Emotional intelligence aids leadership. Home-based work opportunities arise. Team dynamics improve through compassion.',
      healthOverall: 'Emotional wellness is paramount. Address stress through family support. Physical health improves with emotional stability. Digestion and immunity strengthen.',
      financialOverall: 'Financial security improves. Home and property investments beneficial. Family finances stabilize. Savings grow through careful planning. Overall prosperity assured.',
      remedies: ['Wear silver/white gemstone', 'Spend time with family', 'Help single women', 'Keep Moon-related items at home', 'Practice self-care']
    },
    Leo: {
      symbol: '♌',
      color: 'from-yellow-600 to-red-600',
      overview: `${currentYear} is your year to shine, Leo! Recognition, appreciation, and success are assured. Creativity reaches new heights. Romance and pleasure dominate. Your confidence attracts opportunities. This year validates your talents and establishes your importance. A year of personal triumph.`,
      q1: 'Q1 (Jan-Mar): Self-expression peaks. Your talents are showcased. Recognition begins. Romance possibilities increase. Confidence attracts positive attention.',
      q2: 'Q2 (Apr-Jun): Peak performance quarter. Success in projects and endeavors. Public recognition is substantial. Romantic connections deepen. Financial gains through recognition.',
      q3: 'Q3 (Jul-Sep): Sustained success. Achievements continue. Leadership opportunities expand. Admiration from peers increases. Creative projects near completion.',
      q4: 'Q4 (Oct-Dec): Celebration and consolidation. Celebrate achievements. Prepare for leadership roles. Year ends triumphantly. Financial rewards are substantial.',
      loveOverall: 'Romance is prominent. For couples: Passionate connection deepens. For singles: Attracting admirers effortlessly. Relationships are fulfilling and joyful.',
      careerOverall: 'Career shines brightly. Promotions and recognition assured. Leadership opportunities multiply. Your talents receive spotlight. Professional success is outstanding.',
      healthOverall: 'Vitality is exceptional. Heart health is excellent. Physical energy is high. Engage in activities you love. Joy aids overall wellness.',
      financialOverall: 'Outstanding financial year. Income increases significantly. Investments prosper. Spending on pleasure is justified. Financial confidence grows immensely.',
      remedies: ['Wear gold/orange items', 'Worship Sun daily', 'Donate to charity', 'Help those in need', 'Practice gratitude']
    },
    Virgo: {
      symbol: '♍',
      color: 'from-green-600 to-gray-600',
      overview: `${currentYear} is a year of introspection and spiritual growth for Virgo. Though outwardly quiet, internally you're evolving profoundly. Rest and reflection are important. Career takes a backseat to inner development. This year prepares you for greater roles in the future.`,
      q1: 'Q1 (Jan-Mar): Inner focus. Meditation and spiritual practices gain importance. Career aspects are stable but not fast-paced. Health routines improve. Quiet reflection guides decisions.',
      q2: 'Q2 (Apr-Jun): Slow progress. Work continues steadily. Healing and recovery emphasized. Relationships are peaceful. Financial matters are stable without major changes.',
      q3: 'Q3 (Jul-Sep): Preparation phase. Laying groundwork for future projects. Organizing and planning behind the scenes. Building reserves for future activities.',
      q4: 'Q4 (Oct-Dec): Renewed energy. Feeling stronger spiritually and emotionally. Year ends with peace. Ready to enter more active phase next year.',
      loveOverall: 'Relationships are peaceful and supportive. For couples: Deep understanding develops. For singles: Meeting someone grounded and reliable. Stability in love.',
      careerOverall: 'Career progresses steadily. Your reliability is valued. Promotion may come later. Focus on skill development. Lay groundwork for future advancement.',
      healthOverall: 'Health improves through better routines. Mental wellness peaks through meditation. Digestive system strengthens. Physical activity helps. Overall vitality increases.',
      financialOverall: 'Financial stability throughout the year. Modest income growth. Savings increase steadily. Avoid speculation. Build emergency fund.',
      remedies: ['Wear green/gray gemstone', 'Practice yoga regularly', 'Keep workspace organized', 'Help elders', 'Maintain daily routines']
    },
    Libra: {
      symbol: '♎',
      color: 'from-pink-500 to-purple-600',
      overview: `${currentYear} brings social prominence and joy to Libra. Friendships and networks multiply. Social activities increase significantly. Financial gains through group endeavors. This is a year for teamwork and collective efforts. Community involvement brings satisfaction and opportunities.`,
      q1: 'Q1 (Jan-Mar): Social expansion. Friendships multiply. Groups and communities offer opportunities. Networking is fruitful. Financial gains through cooperation.',
      q2: 'Q2 (Apr-Jun): Active social phase. Events and gatherings are numerous. Group projects succeed. Income from collective efforts increases. Happiness through social connections.',
      q3: 'Q3 (Jul-Sep): Community involvement peaks. Your role in groups becomes significant. Leadership in group settings possible. Collective projects benefit greatly from your involvement.',
      q4: 'Q4 (Oct-Dec): Consolidation of social gains. Friendships deepened through the year. Financial benefits from group endeavors realized. Community recognition.',
      loveOverall: 'Social settings bring romantic possibilities. For couples: Couple activities strengthen bond. For singles: Meeting someone through social networks. Group activities aid romance.',
      careerOverall: 'Career advances through teamwork and cooperation. Group projects succeed. Your diplomatic skills valued. Collaborations bring success. Financial benefits through partnerships.',
      healthOverall: 'Social engagement improves mental health. Group activities aid wellness. Physical activities with friends bring joy. Overall health is good.',
      financialOverall: 'Good financial year through group endeavors. Income from collaborations. Investments in group ventures prosper. Financial stability improves.',
      remedies: ['Wear light blue/pink gemstone', 'Engage actively in community', 'Help friends and groups', 'Cultivate partnerships', 'Practice meditation']
    },
    Scorpio: {
      symbol: '♏',
      color: 'from-red-700 to-purple-600',
      overview: `${currentYear} is a year of power and achievement for Scorpio. Career reaches prominent positions. Professional recognition is substantial. This is your year to lead and influence. Financial gains are significant. Personal power increases dramatically. A year of career triumph and status elevation.`,
      q1: 'Q1 (Jan-Mar): Career focus begins. Your qualifications stand out. Recognition for past work. Career advancement planning starts.',
      q2: 'Q2 (Apr-Jun): Career acceleration. Promotions or significant advancement likely. Your leadership abilities recognized. Financial gains substantial. Status in organization improves.',
      q3: 'Q3 (Jul-Sep): Peak professional period. Your influence is maximum. Authority and power increase. Financial rewards align with status. Career achievements are outstanding.',
      q4: 'Q4 (Oct-Dec): Consolidation of success. Year ends on high note. Prepare for even greater roles next year. Financial year-end is very positive.',
      loveOverall: 'Relationships improve with personal success. For couples: Increased confidence strengthens bond. For singles: Meeting someone successful and powerful. Relationships flourish.',
      careerOverall: 'Outstanding career year. Promotions and recognition assured. Professional power increases significantly. Your influence expands. Year-end rewards are substantial.',
      healthOverall: 'Physical health is strong. Intense energy is channeled productively. Mental power increases. Emotional stability improves.',
      financialOverall: 'Outstanding financial year. Income increases significantly through career advancement. Investments prosper. Financial power increases substantially.',
      remedies: ['Wear red/black gemstone', 'Worship Mars', 'Practice power meditation', 'Help others heal', 'Maintain discipline']
    },
    Sagittarius: {
      symbol: '♐',
      color: 'from-purple-600 to-blue-600',
      overview: `${currentYear} brings expansion and good fortune to Sagittarius. Travel and adventure are highlighted. Learning opportunities abound. Personal growth is significant. Optimism and luck are your companions. This is a year of exploration, both physical and intellectual. Doors open easily.`,
      q1: 'Q1 (Jan-Mar): Expansion phase begins. Learning opportunities arise. Travel plans form. Optimism attracts opportunities. Financial growth starts.',
      q2: 'Q2 (Apr-Jun): Active adventure. Travel increases bringing new experiences. Learning accelerates. Career expands through new skills. Financial growth continues.',
      q3: 'Q3 (Jul-Sep): Peak expansion. Adventure and learning reach high points. Opportunities multiply. Financial growth is substantial. Personal development is remarkable.',
      q4: 'Q4 (Oct-Dec): Consolidation of growth. Integrate learning and experiences. Financial gains are realized. Year ends with gratitude and optimism.',
      loveOverall: 'Romance blooms through travel and new experiences. For couples: Adventure strengthens bond. For singles: Meeting someone adventurous. Relationships are exciting.',
      careerOverall: 'Career expands through learning and skill development. Opportunities in new domains. Financial benefits substantial. Growth trajectory is upward.',
      healthOverall: 'Health is excellent. Energy is high. Physical vitality peaks. Outdoor activities aid wellness. Mental enthusiasm boosts health.',
      financialOverall: 'Outstanding financial growth. Income from multiple sources. Investments prosper. Generosity brings satisfaction. Overall prosperity is assured.',
      remedies: ['Wear yellow/purple gemstone', 'Travel for learning', 'Help those seeking knowledge', 'Practice gratitude', 'Maintain optimism']
    },
    Capricorn: {
      symbol: '♑',
      color: 'from-gray-700 to-black-600',
      overview: `${currentYear} is transformative for Capricorn. After years of building, this is reaping time. Financial gains are substantial. Material security improves dramatically. Personal goals are achieved. This year validates your long-term planning and discipline. Success and recognition are assured.`,
      q1: 'Q1 (Jan-Mar): Reaping begins. Financial gains from long-term efforts. Recognition for past work. Material improvements occur.',
      q2: 'Q2 (Apr-Jun): Substantial gains. Career recognition increases. Financial growth accelerates. Investments yield significant returns.',
      q3: 'Q3 (Jul-Sep): Peak realization. Goals achieved. Financial security solidified. Status and recognition high. Material comfort assured.',
      q4: 'Q4 (Oct-Dec): Consolidation of gains. Reflect on journey. Financial year-end is very positive. Prepare for new phases with strength.',
      loveOverall: 'Relationships stabilize and mature. For couples: Commitment deepens. For singles: Meeting someone responsible. Lasting bonds form.',
      careerOverall: 'Career reaches desired heights. Recognition and rewards substantial. Financial benefits align with career success. Status improves significantly.',
      healthOverall: 'Health improves through success and reduced stress. Vitality increases. Strength and endurance peak.',
      financialOverall: 'Outstanding financial year. Substantial income growth. Investments mature profitably. Financial security is strong.',
      remedies: ['Wear black/gray gemstone', 'Worship Saturn', 'Help elderly', 'Practice discipline', 'Plant trees']
    },
    Aquarius: {
      symbol: '♒',
      color: 'from-blue-600 to-cyan-600',
      overview: `${currentYear} focuses on personal joy and relationships for Aquarius. Happiness through close connections. Romantic possibilities increase. Creative pursuits flourish. Social life becomes vibrant. This is a year of personal fulfillment through relationships and creative expression.`,
      q1: 'Q1 (Jan-Mar): Personal focus. Relationships take center stage. Creative projects begin. Social life becomes active.',
      q2: 'Q2 (Apr-Jun): Romance and creativity peak. Social activities bring joy. Creative pursuits flourish. Relationships deepen.',
      q3: 'Q3 (Jul-Sep): Sustained happiness. Relationships are strong. Creative projects succeed. Social engagements are numerous.',
      q4: 'Q4 (Oct-Dec): Deepening of bonds. Relationships year-end solidified. Creative satisfaction. Personal happiness is high.',
      loveOverall: 'Romance is vibrant and creative. For couples: New dimensions to relationship. For singles: Meeting someone unique. Relationships are fulfilling.',
      careerOverall: 'Career through creative and innovative pursuits. Group projects succeed. Teamwork benefits career. Financial gains moderate.',
      healthOverall: 'Health improves through happiness. Social activities aid wellness. Mental health peaks. Creativity aids healing.',
      financialOverall: 'Moderate financial growth. Income from creative pursuits possible. Group ventures beneficial. Overall prosperity is solid.',
      remedies: ['Wear blue/silver gemstone', 'Engage in community', 'Create art', 'Help humanitarian causes', 'Practice meditation']
    },
    Pisces: {
      symbol: '♓',
      color: 'from-purple-500 to-green-600',
      overview: `${currentYear} emphasizes home and family for Pisces. Domestic life brings great satisfaction. Home improvements are possible. Family bonds strengthen. Financial investments in property show promise. This year brings comfort and security through home-based stability. Spiritual development deepens.`,
      q1: 'Q1 (Jan-Mar): Home focus. Family planning occurs. Home improvements begin. Family bonds strengthen.',
      q2: 'Q2 (Apr-Jun): Active home building. Property investments possible. Family celebrations occur. Home becomes more beautiful.',
      q3: 'Q3 (Jul-Sep): Family relationships peak. Home improvements complete. Domestic happiness is high. Financial investments in property are wise.',
      q4: 'Q4 (Oct-Dec): Consolidation of home improvements. Family bonds are stronger. Financial year-end is positive. Spiritual practice deepens.',
      loveOverall: 'Relationships deepen through home and family life. For couples: Domestic bliss. For singles: Meeting someone family-oriented. Long-term bonds.',
      careerOverall: 'Career through home-based or family businesses. Creative professions thrive. Healing professions flourish. Financial gains solid.',
      healthOverall: 'Emotional wellness through family support. Physical health stabilizes. Healing occurs. Immunity improves.',
      financialOverall: 'Good financial year through investments. Home and property beneficial. Family financial matters improve. Charitable giving brings satisfaction.',
      remedies: ['Wear sea green/purple', 'Spend time with family', 'Practice meditation', 'Help those in need', 'Create spiritual space at home']
    }
  };

  const horoscope = yearlyHoroscopes[selectedSign];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Yearly Horoscope 2024 - Happy Kismat"
        description={`Read your detailed yearly horoscope for ${currentYear} with quarterly predictions and comprehensive guidance.`}
      />

      {/* Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/free-kundli-tools" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Free Tools
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">🌟 Yearly Horoscope {currentYear}</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive yearly astrological predictions for {currentYear}. Get detailed quarterly insights and annual guidance for all life areas.
            </p>
          </div>
        </div>
      </section>

      {/* Zodiac Selection */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">Select Your Zodiac Sign</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto">
              {zodiacSigns.map((sign) => (
                <Button
                  key={sign}
                  onClick={() => setSelectedSign(sign)}
                  className={`py-2 font-semibold transition-all ${
                    selectedSign === sign
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-white border-2 border-purple-200 text-purple-600 hover:border-purple-500'
                  }`}
                >
                  {sign}
                </Button>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {/* Year Overview */}
            <Card className={`p-8 border-2 bg-gradient-to-r ${horoscope.color} text-white`}>
              <p className="text-sm uppercase tracking-widest mb-2 opacity-90">Annual Overview {currentYear}</p>
              <p className="text-4xl font-bold mb-4">{horoscope.symbol} {selectedSign}</p>
              <p className="text-lg leading-relaxed">{horoscope.overview}</p>
            </Card>

            {/* Quarterly Breakdown */}
            <Card className="p-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <h3 className="text-2xl font-bold text-purple-900 mb-6">📊 Quarterly Breakdown</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
                  <p className="font-bold text-purple-900 mb-3 text-lg">Q1: January - March</p>
                  <p className="text-gray-700">{horoscope.q1}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
                  <p className="font-bold text-purple-900 mb-3 text-lg">Q2: April - June</p>
                  <p className="text-gray-700">{horoscope.q2}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-orange-500">
                  <p className="font-bold text-purple-900 mb-3 text-lg">Q3: July - September</p>
                  <p className="text-gray-700">{horoscope.q3}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-red-500">
                  <p className="font-bold text-purple-900 mb-3 text-lg">Q4: October - December</p>
                  <p className="text-gray-700">{horoscope.q4}</p>
                </div>
              </div>
            </Card>

            {/* Life Areas Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-2 border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
                <h4 className="font-bold text-purple-900 mb-3 text-lg">💕 Love & Relationships</h4>
                <p className="text-gray-700">{horoscope.loveOverall}</p>
              </Card>

              <Card className="p-6 border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                <h4 className="font-bold text-purple-900 mb-3 text-lg">💼 Career & Work</h4>
                <p className="text-gray-700">{horoscope.careerOverall}</p>
              </Card>

              <Card className="p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                <h4 className="font-bold text-purple-900 mb-3 text-lg">❤️ Health & Wellness</h4>
                <p className="text-gray-700">{horoscope.healthOverall}</p>
              </Card>

              <Card className="p-6 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
                <h4 className="font-bold text-purple-900 mb-3 text-lg">💰 Finances</h4>
                <p className="text-gray-700">{horoscope.financialOverall}</p>
              </Card>
            </div>

            {/* Year Overview & Astrological Context */}
            <Card className="p-6 border-2 border-indigo-200 bg-indigo-50">
              <h3 className="font-bold text-indigo-900 mb-3 text-lg">🪐 What Makes {currentYear} Astrologically Important?</h3>
              <p className="text-gray-700 leading-relaxed text-sm mb-3">
                {currentYear} is shaped by major planetary transits, eclipses, and slow-moving planet movements. Jupiter, Saturn, Rahu, and Ketu positions throughout the year significantly influence your destiny. Eclipses serve as powerful pivot points creating transformation. Understanding these cosmic patterns helps you navigate the year with awareness and grace.
              </p>
              <p className="text-gray-700 text-sm italic">
                The year emphasizes focus on long-term goals, karmic patterns, and sustained growth through consistent effort and wisdom.
              </p>
            </Card>

            {/* Remedies */}
            <Card className="p-6 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
              <h3 className="font-bold text-purple-900 mb-4 text-lg">🧿 Year-Long Remedies for Success</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {horoscope.remedies.map((remedy, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-white rounded-lg border border-amber-200">
                    <span className="text-amber-600 font-bold">✓</span>
                    <p className="text-sm text-gray-700">{remedy}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Key Takeaways */}
            <Card className="p-6 border-2 border-green-200 bg-green-50">
              <h3 className="font-bold text-green-900 mb-4 text-lg flex items-center gap-2">
                <Star className="w-5 h-5" />
                Key Themes for {currentYear}
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-gray-700">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Long-term Planning:</strong> Focus on goals that serve your highest potential</span>
                </li>
                <li className="flex gap-3 text-sm text-gray-700">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Karmic Patterns:</strong> Understanding and resolving past patterns</span>
                </li>
                <li className="flex gap-3 text-sm text-gray-700">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Consistent Growth:</strong> Slow but steady progress yields lasting results</span>
                </li>
                <li className="flex gap-3 text-sm text-gray-700">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Transformation:</strong> Eclipses bring turning points and new chapters</span>
                </li>
              </ul>
            </Card>

            {/* Call to Action */}
            <Card className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-purple-700">
              <p className="mb-3">Want deeper personalized guidance for {currentYear}?</p>
              <Button className="bg-white text-purple-600 hover:bg-gray-100 font-bold">
                Book a Personal Consultation
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YearlyHoroscope;
