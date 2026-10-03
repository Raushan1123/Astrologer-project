import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const DailyHoroscope = () => {
  const [selectedSign, setSelectedSign] = useState('Aries');
  const [viewType, setViewType] = useState('today'); // today or tomorrow

  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formattedToday = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const formattedTomorrow = tomorrow.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const horoscopes = {
    Aries: {
      symbol: '♈',
      color: 'from-red-600 to-orange-600',
      dateRange: 'Mar 21 - Apr 19',
      element: 'Fire',
      rulingPlanet: 'Mars',
      today: {
        planetaryMovements: 'The Moon is transiting through your sector of communication today, energizing Mercury\'s influence. Mars, your ruling planet, supports bold action and initiative. This is an excellent day for taking the lead and expressing your ideas with confidence.',
        loveRelationships: 'Romantic energy is particularly strong today. For couples, this is an ideal time for meaningful conversations and intimate moments. Your charisma attracts attention effortlessly. Singles may meet someone intriguing through social interactions or professional settings.',
        careerWork: 'Your professional instincts are sharp today. Leadership opportunities emerge as colleagues recognize your competence and drive. It\'s a favorable day for presentations, negotiations, or pursuing that promotion you\'ve been considering. Your confidence translates into tangible success.',
        moneyFinance: 'Financial prospects look bright. Unexpected gains are possible through work or investments. However, avoid impulsive purchases in the evening. Overall, this is a day of financial growth and opportunity.',
        healthWellbeing: 'Your physical energy is at peak levels today. This is an excellent time for exercise, sports, or any physical activity. Mental clarity is sharp. Practice stress-relief techniques in the evening to maintain emotional balance.',
        personalGrowth: 'Today brings clarity on your long-term goals. Your intuition guides you toward positive decisions. Trust your instincts and take inspired action. This energy supports personal transformation and self-improvement.',
        luckyHours: '9:00 AM - 11:00 AM, 4:00 PM - 6:00 PM',
        luckyColors: 'Red, Orange, Gold',
        luckyNumbers: '1, 5, 9',
        dosDonts: ['✓ Take initiative and be bold', '✓ Express yourself clearly', '✓ Pursue leadership roles', '✗ Avoid overconfidence', '✗ Don\'t make hasty decisions', '✗ Don\'t ignore others\' perspectives']
      },
      tomorrow: {
        planetaryMovements: 'Tomorrow, the Moon moves into a more introspective sector. Reflect on recent events and gather information before your next move. Mercury supports analytical thinking and detailed work.',
        loveRelationships: 'A calmer energy surrounds relationships tomorrow. It\'s a good day for listening and understanding your partner\'s needs. Quality time in quiet settings proves more rewarding than social outings.',
        careerWork: 'Focus on detailed work and planning rather than major launches. Complete pending projects and organize your workspace. Your attention to detail yields excellent results. Collaboration with team members brings clarity.',
        moneyFinance: 'Financial matters require careful attention tomorrow. Review your budget and investments. Avoid major financial decisions. This is a day for consolidation rather than expansion.',
        healthWellbeing: 'Take a gentler approach to exercise tomorrow. Yoga, meditation, or light walks are beneficial. Rest is as important as activity. Pay attention to your emotional well-being.',
        personalGrowth: 'Tomorrow favors introspection and learning. Read, study, or pursue intellectual interests. Reflect on lessons from recent experiences. Personal growth comes through understanding, not action.',
        luckyHours: '7:00 AM - 9:00 AM, 2:00 PM - 4:00 PM',
        luckyColors: 'Earth Tones, Beige, Brown',
        luckyNumbers: '3, 6, 9'
      }
    },
    Taurus: {
      symbol: '♉',
      color: 'from-green-600 to-emerald-600',
      dateRange: 'Apr 20 - May 20',
      element: 'Earth',
      rulingPlanet: 'Venus',
      today: {
        planetaryMovements: 'The Moon harmonizes with Venus today, your ruling planet. This creates a beautiful day for love, creativity, and material abundance. Earth energy grounds your plans, making this ideal for manifesting your desires.',
        loveRelationships: 'Romance is beautifully highlighted today. Your natural charm and warmth attract admiration. For couples, show affection through thoughtful gestures. Singles may attract someone stable and reliable. This is a day of emotional security and beauty.',
        careerWork: 'Steady progress marks your professional day. Your reliable nature gains recognition. Collaborations are harmonious. It\'s an excellent day for negotiations, presentations, or securing a deal. Financial projects show promise.',
        moneyFinance: 'Financial gains are likely today, especially through work or creative ventures. It\'s a good day to invest in quality items or long-term security. Your financial instincts are sound. Trust your practical judgment.',
        healthWellbeing: 'Your health is excellent today. Physical vitality is strong. Good digestion and immunity. Enjoy nature walks or gardening. A balanced diet supports your well-being.',
        personalGrowth: 'Today brings stability to your personal development. You move steadily toward your goals. Your grounded nature helps you build solid foundations for future success.',
        luckyHours: '10:00 AM - 12:00 PM, 6:00 PM - 8:00 PM',
        luckyColors: 'Green, Blue, Turquoise',
        luckyNumbers: '2, 4, 6',
        dosDonts: ['✓ Be patient and deliberate', '✓ Trust your instincts', '✓ Invest in quality', '✗ Avoid stubbornness', '✗ Don\'t resist change', '✗ Don\'t overspend']
      },
      tomorrow: {
        planetaryMovements: 'Tomorrow, the Moon shifts, requiring flexibility. Adapt to new situations with grace. Mercury supports communication and short travels.',
        loveRelationships: 'Express your feelings tomorrow. Communication strengthens relationships. Couples should share their thoughts openly.',
        careerWork: 'Tomorrow favors variety and communication. Short trips or meetings may arise. Stay flexible and open to new ideas.',
        moneyFinance: 'Financial activity increases tomorrow. Moderate growth through communication-based work.',
        healthWellbeing: 'Tomorrow, mental clarity is key. Light exercise and social activity boost well-being.',
        personalGrowth: 'Tomorrow brings learning opportunities. Stay curious and open to new perspectives.',
        luckyHours: '8:00 AM - 10:00 AM, 3:00 PM - 5:00 PM',
        luckyColors: 'Yellow, White',
        luckyNumbers: '5, 7'
      }
    },
    Gemini: {
      symbol: '♊',
      color: 'from-yellow-500 to-orange-500',
      dateRange: 'May 21 - Jun 20',
      element: 'Air',
      rulingPlanet: 'Mercury',
      today: {
        planetaryMovements: 'Mercury, your ruling planet, is strongly active today. The Moon illuminates your communication sector. This is your day to shine through words, ideas, and connections. Information flows easily, and networking brings opportunities.',
        loveRelationships: 'Communication is the key to romantic success today. Express your feelings clearly and listen actively to your partner. Wit and intellectual connection attract others. Singles may meet someone clever and engaging.',
        careerWork: 'Your communication skills are your superpower today. Presentations, negotiations, and pitches succeed brilliantly. Networking leads to career opportunities. Your ideas are valued and implemented. Collaboration flourishes.',
        moneyFinance: 'Financial opportunities arise through communication-based work or networking. Short-term investments show promise. Income increases through your professional communication. Stay alert for financial opportunities.',
        healthWellbeing: 'Mental clarity peaks today. Your nervous system is balanced. Engage in activities you enjoy. Light exercise and social interaction boost your mood and health.',
        personalGrowth: 'Today brings intellectual breakthroughs. Learning and skill development peak. Your curiosity leads to valuable discoveries.',
        luckyHours: '8:00 AM - 10:00 AM, 5:00 PM - 7:00 PM',
        luckyColors: 'Yellow, Green, White',
        luckyNumbers: '3, 5, 7',
        dosDonts: ['✓ Communicate openly', '✓ Network actively', '✓ Share your ideas', '✗ Avoid gossip', '✗ Don\'t spread yourself thin', '✗ Don\'t be superficial']
      },
      tomorrow: {
        planetaryMovements: 'Tomorrow, the Moon moves into a more introspective sector. Reflect on your communications and connections. Rest your mind after today\'s activity.',
        loveRelationships: 'Tomorrow, quality over quantity matters. Deep, meaningful conversations strengthen bonds.',
        careerWork: 'Tomorrow favors focused work and planning. Complete ongoing projects.',
        moneyFinance: 'Financial decisions should wait until tomorrow passes. Consolidate today\'s gains.',
        healthWellbeing: 'Tomorrow, rest and meditation are beneficial.',
        personalGrowth: 'Tomorrow brings time for reflection and introspection.',
        luckyHours: '7:00 AM - 9:00 AM, 2:00 PM - 4:00 PM',
        luckyColors: 'Silver, Gray'
      }
    },
    Cancer: {
      symbol: '♋',
      color: 'from-blue-600 to-indigo-600',
      dateRange: 'Jun 21 - Jul 22',
      element: 'Water',
      rulingPlanet: 'Moon',
      today: {
        planetaryMovements: 'The Moon is your ally today, and its influence is particularly powerful. Emotional depth guides your decisions. Intuition is heightened. Family and home are highlighted. This is a day for nurturing and caring.',
        loveRelationships: 'Emotional intimacy reaches new heights. Your vulnerability creates deep connections. For couples, share your feelings openly. Singles may meet someone equally sensitive and caring.',
        careerWork: 'Trust your gut feelings at work today. Your emotional intelligence enhances leadership. Care-based work thrives. Your team responds to your compassionate approach.',
        moneyFinance: 'Financial security improves through wise decisions. Home and family investments are favorable. Save for the future. Protect your financial foundation.',
        healthWellbeing: 'Listen to your body today. Rest when tired. Emotional wellness is as important as physical health. Nourishing foods and warm baths are beneficial.',
        personalGrowth: 'Today brings emotional growth and understanding. Family connections deepen.',
        luckyHours: '7:00 AM - 9:00 AM, 3:00 PM - 5:00 PM',
        luckyColors: 'White, Silver, Blue',
        luckyNumbers: '2, 4, 7',
        dosDonts: ['✓ Trust your intuition', '✓ Spend time with family', '✓ Express emotions safely', '✗ Avoid moodiness', '✗ Don\'t be overly sensitive', '✗ Don\'t withdraw completely']
      },
      tomorrow: {
        planetaryMovements: 'Tomorrow brings external activity. Social engagements increase. Balance internal feelings with external expression.',
        loveRelationships: 'Tomorrow, share your feelings through action and presence.',
        careerWork: 'Tomorrow favors creative expression and public recognition.',
        moneyFinance: 'Financial opportunities through creative or social ventures.',
        healthWellbeing: 'Tomorrow, engage in social activities for wellness.',
        personalGrowth: 'Tomorrow brings confidence and self-expression.',
        luckyHours: '9:00 AM - 11:00 AM, 6:00 PM - 8:00 PM',
        luckyColors: 'Gold, Orange'
      }
    },
    Leo: {
      symbol: '♌',
      color: 'from-yellow-600 to-red-600',
      dateRange: 'Jul 23 - Aug 22',
      element: 'Fire',
      rulingPlanet: 'Sun',
      today: {
        planetaryMovements: 'Your ruling planet, the Sun, radiates brilliantly today. The Moon amplifies your charisma and confidence. This is your day to shine! Recognition and appreciation come your way. You\'re the center of positive attention.',
        loveRelationships: 'Your charisma is irresistible today. Romance flourishes beautifully. Couples experience passionate connection. Singles attract admirers effortlessly. This is a day for celebrating love and pleasure.',
        careerWork: 'Leadership opportunities emerge. Your talents are noticed and appreciated. Promotions or recognition are possible. Confidence translates into professional success. Your performance stands out.',
        moneyFinance: 'Financial gains accompany professional success. Investments show positive returns. Your confidence attracts prosperity. This is a fortunate day for financial matters.',
        healthWellbeing: 'Your vitality is exceptional. Physical energy is high. Engage in activities you love. Heart health is excellent. Joy aids overall wellness.',
        personalGrowth: 'Today brings confidence and self-actualization. You move toward your dreams with conviction.',
        luckyHours: '9:00 AM - 11:00 AM, 7:00 PM - 9:00 PM',
        luckyColors: 'Gold, Orange, Red',
        luckyNumbers: '1, 5, 9',
        dosDonts: ['✓ Show confidence', '✓ Be generous', '✓ Take the lead', '✗ Avoid arrogance', '✗ Don\'t seek constant attention', '✗ Don\'t neglect others']
      },
      tomorrow: {
        planetaryMovements: 'Tomorrow, focus shifts to planning and organization. The pace slows. Use this time to organize and consolidate.',
        loveRelationships: 'Tomorrow, show love through practical support.',
        careerWork: 'Tomorrow favors detailed planning and organizing.',
        moneyFinance: 'Tomorrow, careful financial planning is important.',
        healthWellbeing: 'Tomorrow, balance activity with rest.',
        personalGrowth: 'Tomorrow brings introspection and planning.',
        luckyHours: '6:00 AM - 8:00 AM, 2:00 PM - 4:00 PM',
        luckyColors: 'Green, Gray'
      }
    },
    Virgo: {
      symbol: '♍',
      color: 'from-green-600 to-gray-600',
      dateRange: 'Aug 23 - Sep 22',
      element: 'Earth',
      rulingPlanet: 'Mercury',
      today: {
        planetaryMovements: 'Mercury, your ruling planet, supports detailed work and analysis. The Moon illuminates your professional sector. This is an excellent day for completing projects and organizing. Precision and attention to detail yield excellent results.',
        loveRelationships: 'Show love through practical gestures and attentiveness. Your partner appreciates your care and support. Quality time in comfortable settings strengthens bonds. Singles may meet someone equally practical and thoughtful.',
        careerWork: 'Perfection is achievable today. Your analytical skills shine. Quality work gets recognition. It\'s a good day for solving complex problems. Organization and planning bear fruit.',
        moneyFinance: 'Financial matters improve through careful analysis and budgeting. Organize your finances. Avoid unnecessary spending. Long-term financial planning is favorable.',
        healthWellbeing: 'Pay attention to nutrition and health routines. Small health improvements are possible. Detoxification and cleansing are beneficial. Mental clarity supports overall wellness.',
        personalGrowth: 'Today brings growth through learning and skill development. Your dedication to improvement is rewarded.',
        luckyHours: '6:00 AM - 8:00 AM, 2:00 PM - 4:00 PM',
        luckyColors: 'Green, Gray, Blue',
        luckyNumbers: '3, 6, 9',
        dosDonts: ['✓ Be detail-oriented', '✓ Organize thoroughly', '✓ Complete projects', '✗ Avoid over-criticism', '✗ Don\'t be overly perfectionist', '✗ Don\'t worry excessively']
      },
      tomorrow: {
        planetaryMovements: 'Tomorrow brings a shift to creative and social energy. Relax and enjoy life.',
        loveRelationships: 'Tomorrow, celebrate love and connection.',
        careerWork: 'Tomorrow, creative projects receive positive energy.',
        moneyFinance: 'Tomorrow, financial matters can wait.',
        healthWellbeing: 'Tomorrow, engage in enjoyable activities.',
        personalGrowth: 'Tomorrow brings joy and celebration.',
        luckyHours: '9:00 AM - 11:00 AM, 7:00 PM - 9:00 PM',
        luckyColors: 'Gold, Orange'
      }
    },
    Libra: {
      symbol: '♎',
      color: 'from-pink-500 to-purple-600',
      dateRange: 'Sep 23 - Oct 22',
      element: 'Air',
      rulingPlanet: 'Venus',
      today: {
        planetaryMovements: 'Venus, your ruling planet, creates a day of harmony and beauty. The Moon supports partnerships and relationships. Balance and diplomacy are your strengths. This is an excellent day for social connections and collaboration.',
        loveRelationships: 'Romance and beauty shine today. Relationships flourish through mutual appreciation. Couples experience harmony and romance. Singles attract partners through their charm and grace. This is a day for celebrating love.',
        careerWork: 'Partnerships and collaborations succeed beautifully. Your diplomatic skills resolve conflicts. Teamwork brings success. Negotiations are favorable. Your cooperative approach earns recognition.',
        moneyFinance: 'Financial harmony improves. Partnerships bring financial benefits. Investments with others are favorable. Spending on beauty and quality is justified. Financial balance is achieved.',
        healthWellbeing: 'Exercise brings joy. Beauty treatments are beneficial. Social activities boost wellness. Mental peace aids overall health. Your sense of balance supports well-being.',
        personalGrowth: 'Today brings harmony to your personal development. You move toward balance and peace.',
        luckyHours: '9:00 AM - 11:00 AM, 6:00 PM - 8:00 PM',
        luckyColors: 'Pink, Blue, Green',
        luckyNumbers: '2, 4, 7',
        dosDonts: ['✓ Seek balance', '✓ Cooperate', '✓ Be diplomatic', '✗ Avoid indecision', '✗ Don\'t rely entirely on others', '✗ Don\'t neglect yourself']
      },
      tomorrow: {
        planetaryMovements: 'Tomorrow brings intensity and depth. Emotional power increases.',
        loveRelationships: 'Tomorrow, deepen emotional connections.',
        careerWork: 'Tomorrow favors strategic thinking.',
        moneyFinance: 'Tomorrow, financial strategy is important.',
        healthWellbeing: 'Tomorrow, honor your emotional needs.',
        personalGrowth: 'Tomorrow brings transformative insights.',
        luckyHours: '8:00 AM - 10:00 AM, 5:00 PM - 7:00 PM',
        luckyColors: 'Red, Black'
      }
    },
    Scorpio: {
      symbol: '♏',
      color: 'from-red-700 to-purple-600',
      dateRange: 'Oct 23 - Nov 21',
      element: 'Water',
      rulingPlanet: 'Mars',
      today: {
        planetaryMovements: 'Mars, your ruling planet, empowers you with intensity and determination. The Moon highlights your personal power and transformation. This is a day to trust your instincts and take decisive action. Your psychic abilities are heightened.',
        loveRelationships: 'Passion and deep connection dominate today. Your magnetism attracts admirers. Couples experience intense intimacy. Singles encounter someone equally passionate. This is a day for profound emotional connection.',
        careerWork: 'Your strategic thinking shines. You see through complexities easily. Power plays work in your favor. Authority and influence increase. Your determination brings success.',
        moneyFinance: 'Financial gains through strategic decisions. Your investigative instincts guide good investments. Power and control over finances increase. This is a fortunate day financially.',
        healthWellbeing: 'Physical energy is intense and powerful. Emotional processing is necessary. Healing occurs through facing truths. Your resilience supports wellness.',
        personalGrowth: 'Today brings transformation and empowerment. You access your inner power.',
        luckyHours: '8:00 AM - 10:00 AM, 5:00 PM - 7:00 PM',
        luckyColors: 'Red, Black, Maroon',
        luckyNumbers: '2, 4, 8',
        dosDonts: ['✓ Trust your power', '✓ Go deep', '✓ Be strategic', '✗ Avoid revenge', '✗ Don\'t be overly secretive', '✗ Don\'t manipulate']
      },
      tomorrow: {
        planetaryMovements: 'Tomorrow brings expansive and optimistic energy.',
        loveRelationships: 'Tomorrow, adventure and fun strengthen love.',
        careerWork: 'Tomorrow, new opportunities emerge.',
        moneyFinance: 'Tomorrow, financial expansion is possible.',
        healthWellbeing: 'Tomorrow, enjoy physical activities.',
        personalGrowth: 'Tomorrow brings growth and expansion.',
        luckyHours: '10:00 AM - 12:00 PM, 7:00 PM - 9:00 PM',
        luckyColors: 'Purple, Blue'
      }
    },
    Sagittarius: {
      symbol: '♐',
      color: 'from-purple-600 to-blue-600',
      dateRange: 'Nov 22 - Dec 21',
      element: 'Fire',
      rulingPlanet: 'Jupiter',
      today: {
        planetaryMovements: 'Jupiter, your ruling planet, brings luck and expansion. The Moon highlights growth and adventure. This is a day of optimism and new possibilities. Horizons expand, and opportunities abound.',
        loveRelationships: 'Adventurous and fun energy attracts partners. Relationships become more exciting. Couples enjoy new experiences together. Singles meet someone equally adventurous. This is a day for romantic adventures.',
        careerWork: 'Growth opportunities arise. Your enthusiasm inspires others. Learning and development peak. Career expansion is possible. Your optimism translates into professional success.',
        moneyFinance: 'Financial expansion and growth are likely. Investments may yield returns. Income increases through new opportunities. This is a fortunate day for finances. Abundance flows toward you.',
        healthWellbeing: 'Physical energy and enthusiasm are high. Outdoor activities are beneficial. Your positive outlook supports wellness. Movement and adventure boost health.',
        personalGrowth: 'Today brings expansion and new possibilities. You grow through exploration and learning.',
        luckyHours: '10:00 AM - 12:00 PM, 7:00 PM - 9:00 PM',
        luckyColors: 'Purple, Blue, Gold',
        luckyNumbers: '3, 6, 9',
        dosDonts: ['✓ Be optimistic', '✓ Explore', '✓ Take opportunities', '✗ Avoid overcommitment', '✗ Don\'t be reckless', '✗ Don\'t ignore responsibilities']
      },
      tomorrow: {
        planetaryMovements: 'Tomorrow brings structure and discipline. Ground your recent expansions.',
        loveRelationships: 'Tomorrow, commitment and stability matter.',
        careerWork: 'Tomorrow, focus on building solid foundations.',
        moneyFinance: 'Tomorrow, financial responsibility is key.',
        healthWellbeing: 'Tomorrow, consistent health routines are important.',
        personalGrowth: 'Tomorrow brings grounded, practical growth.',
        luckyHours: '8:00 AM - 10:00 AM, 4:00 PM - 6:00 PM',
        luckyColors: 'Black, Gray'
      }
    },
    Capricorn: {
      symbol: '♑',
      color: 'from-gray-700 to-black-600',
      dateRange: 'Dec 22 - Jan 19',
      element: 'Earth',
      rulingPlanet: 'Saturn',
      today: {
        planetaryMovements: 'Saturn, your ruling planet, supports discipline and achievement. The Moon highlights ambition and success. This is a day for serious progress. Your hard work pays off.',
        loveRelationships: 'Relationship stability improves. Your commitment is recognized and appreciated. For couples, long-term bonds strengthen. Singles meet someone serious and dependable. This is a day for building lasting connections.',
        careerWork: 'Ambition drives your professional day. Your hard work receives recognition. Promotion or increased responsibility is possible. Authority and respect increase. Career progress is assured.',
        moneyFinance: 'Financial gains through hard work and discipline. Investments mature favorably. Your practical approach yields results. Financial security improves. Wealth accumulation progresses.',
        healthWellbeing: 'Physical strength and endurance are excellent. Build strength through consistent effort. Bones and joints are strong. Your resilience supports wellness.',
        personalGrowth: 'Today brings achievement and recognition. Your dedication is rewarded.',
        luckyHours: '8:00 AM - 10:00 AM, 4:00 PM - 6:00 PM',
        luckyColors: 'Black, Gray, Brown',
        luckyNumbers: '1, 4, 8',
        dosDonts: ['✓ Be ambitious', '✓ Stay disciplined', '✓ Build foundations', '✗ Avoid pessimism', '✗ Don\'t be too rigid', '✗ Don\'t overwork']
      },
      tomorrow: {
        planetaryMovements: 'Tomorrow brings social and friendly energy.',
        loveRelationships: 'Tomorrow, connect with friends and community.',
        careerWork: 'Tomorrow, collaboration and teamwork thrive.',
        moneyFinance: 'Tomorrow, financial opportunities through groups.',
        healthWellbeing: 'Tomorrow, social activities boost wellness.',
        personalGrowth: 'Tomorrow brings connection and community.',
        luckyHours: '11:00 AM - 1:00 PM, 8:00 PM - 10:00 PM',
        luckyColors: 'Blue, Silver'
      }
    },
    Aquarius: {
      symbol: '♒',
      color: 'from-blue-600 to-cyan-600',
      dateRange: 'Jan 20 - Feb 18',
      element: 'Air',
      rulingPlanet: 'Saturn',
      today: {
        planetaryMovements: 'Saturn supports innovation and progress. The Moon highlights your aspirations and achievements. This is a day for creative ideas and recognition. Your unique perspective shines.',
        loveRelationships: 'Intellectual connection is highlighted. Unique bonds deepen. For couples, freedom within love strengthens bonds. Singles meet someone equally innovative. This is a day for celebrating individuality.',
        careerWork: 'Innovation and new ideas are breakthrough today. Your unique approach is valued. Technology and forward-thinking succeed. Group efforts flourish. Your leadership is recognized.',
        moneyFinance: 'Financial gains through innovation and technology. Group investments may be favorable. Your unique skills bring income. Financial progress through originality.',
        healthWellbeing: 'Mental wellness is excellent. Nervous system is balanced. Social activity supports wellness. Engaging in causes you believe in boosts health.',
        personalGrowth: 'Today brings innovation and forward progress. You move toward your vision.',
        luckyHours: '11:00 AM - 1:00 PM, 8:00 PM - 10:00 PM',
        luckyColors: 'Blue, Silver, Cyan',
        luckyNumbers: '4, 7, 11',
        dosDonts: ['✓ Be innovative', '✓ Help others', '✓ Think progressively', '✗ Avoid detachment', '✗ Don\'t be eccentric', '✗ Don\'t ignore emotions']
      },
      tomorrow: {
        planetaryMovements: 'Tomorrow brings compassion and spirituality.',
        loveRelationships: 'Tomorrow, deepen spiritual connection.',
        careerWork: 'Tomorrow, creative and spiritual work thrives.',
        moneyFinance: 'Tomorrow, financial intuition is strong.',
        healthWellbeing: 'Tomorrow, spiritual practices support wellness.',
        personalGrowth: 'Tomorrow brings spiritual growth.',
        luckyHours: '9:00 AM - 11:00 AM, 6:00 PM - 8:00 PM',
        luckyColors: 'Purple, Green'
      }
    },
    Pisces: {
      symbol: '♓',
      color: 'from-purple-500 to-green-600',
      dateRange: 'Feb 19 - Mar 20',
      element: 'Water',
      rulingPlanet: 'Jupiter',
      today: {
        planetaryMovements: 'Jupiter, your ruling planet, brings spiritual blessings. The Moon illuminates your inner world. Dreams come alive. Spirituality deepens. Your creativity flows abundantly.',
        loveRelationships: 'Romantic and dreamy energy surrounds you. Spiritual connection with partners deepens. For couples, compassion and understanding strengthen bonds. Singles meet someone equally sensitive. This is a day for soul connections.',
        careerWork: 'Your intuition guides professional decisions. Creative projects flourish. Artistic and spiritual work is highlighted. Your compassionate approach gains recognition. Inspiration flows through your work.',
        moneyFinance: 'Financial intuition is strong. Unexpected gains are possible. Your generosity is rewarded. Financial and spiritual blessings flow. Trust the universe.',
        healthWellbeing: 'Emotional and spiritual wellness peak. Listen to your body\'s needs. Rest and meditation are beneficial. Healing occurs through compassion and forgiveness.',
        personalGrowth: 'Today brings spiritual awakening and growth. You access deeper wisdom.',
        luckyHours: '9:00 AM - 11:00 AM, 6:00 PM - 8:00 PM',
        luckyColors: 'Purple, Green, White',
        luckyNumbers: '3, 6, 9, 12',
        dosDonts: ['✓ Trust intuition', '✓ Be compassionate', '✓ Pursue creativity', '✗ Avoid escapism', '✗ Don\'t be overly idealistic', '✗ Don\'t ignore reality']
      },
      tomorrow: {
        planetaryMovements: 'Tomorrow brings courage and bold action.',
        loveRelationships: 'Tomorrow, be brave in expressing love.',
        careerWork: 'Tomorrow, take leadership and initiative.',
        moneyFinance: 'Tomorrow, bold financial moves may succeed.',
        healthWellbeing: 'Tomorrow, physical activity energizes you.',
        personalGrowth: 'Tomorrow brings confidence and action.',
        luckyHours: '9:00 AM - 11:00 AM, 4:00 PM - 6:00 PM',
        luckyColors: 'Red, Orange'
      }
    }
  };

  const currentHoroscope = horoscopes[selectedSign];
  const displayData = viewType === 'today' ? currentHoroscope.today : currentHoroscope.tomorrow;
  const displayDate = viewType === 'today' ? formattedToday : formattedTomorrow;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Daily Horoscope - Happy Kismat"
        description="Get your daily horoscope predictions for all 12 zodiac signs with detailed insights."
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/free-kundli-tools" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Free Tools
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">📅 Daily Horoscope</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get today's personalized astrology predictions for your zodiac sign with detailed insights on love, career, finances, health, and more.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Date Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={() => setViewType('today')}
              className={`px-6 py-2 rounded-lg font-semibold ${
                viewType === 'today'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Today
            </Button>
            <Button
              onClick={() => setViewType('tomorrow')}
              className={`px-6 py-2 rounded-lg font-semibold ${
                viewType === 'tomorrow'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Tomorrow
            </Button>
          </div>

          {/* Zodiac Sign Selection */}
          <div className="mb-8">
            <p className="text-center text-gray-600 mb-4 font-semibold">Select Your Zodiac Sign:</p>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-2">
              {zodiacSigns.map((sign) => (
                <Button
                  key={sign}
                  onClick={() => setSelectedSign(sign)}
                  className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                    selectedSign === sign
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white border-2 border-purple-200 text-purple-600 hover:border-purple-400'
                  }`}
                >
                  {sign.substring(0, 3)}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Horoscope Display */}
          <div className="space-y-6">
            {/* Header Card */}
            <Card className="p-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-4xl font-bold mb-2">{selectedSign} {currentHoroscope.symbol}</h2>
                  <p className="text-purple-100">{currentHoroscope.dateRange}</p>
                  <p className="text-purple-100">Element: {currentHoroscope.element} • Ruling Planet: {currentHoroscope.rulingPlanet}</p>
                </div>
                <div className="text-right">
                  <Calendar className="w-8 h-8 mb-2" />
                  <p className="text-sm">{displayDate}</p>
                </div>
              </div>
            </Card>

            {/* Planetary Movements */}
            <Card className="p-6 border-2 border-blue-200 bg-blue-50">
              <h3 className="text-xl font-bold text-blue-900 mb-3">🪐 Today's Planetary Movements</h3>
              <p className="text-gray-700 leading-relaxed">{displayData.planetaryMovements}</p>
            </Card>

            {/* Life Areas Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Love & Relationships */}
              <Card className="p-6 border-2 border-pink-200 bg-pink-50">
                <h3 className="text-lg font-bold text-pink-900 mb-3">💕 Love & Relationships</h3>
                <p className="text-gray-700 leading-relaxed">{displayData.loveRelationships}</p>
              </Card>

              {/* Career & Work */}
              <Card className="p-6 border-2 border-green-200 bg-green-50">
                <h3 className="text-lg font-bold text-green-900 mb-3">💼 Career & Work</h3>
                <p className="text-gray-700 leading-relaxed">{displayData.careerWork}</p>
              </Card>

              {/* Money & Finance */}
              <Card className="p-6 border-2 border-yellow-200 bg-yellow-50">
                <h3 className="text-lg font-bold text-yellow-900 mb-3">💰 Money & Finance</h3>
                <p className="text-gray-700 leading-relaxed">{displayData.moneyFinance}</p>
              </Card>

              {/* Health & Well-being */}
              <Card className="p-6 border-2 border-red-200 bg-red-50">
                <h3 className="text-lg font-bold text-red-900 mb-3">🏥 Health & Well-being</h3>
                <p className="text-gray-700 leading-relaxed">{displayData.healthWellbeing}</p>
              </Card>

              {/* Personal Growth */}
              <Card className="p-6 border-2 border-orange-200 bg-orange-50">
                <h3 className="text-lg font-bold text-orange-900 mb-3">🌱 Personal Growth</h3>
                <p className="text-gray-700 leading-relaxed">{displayData.personalGrowth}</p>
              </Card>

              {/* Travel & Luck */}
              <Card className="p-6 border-2 border-indigo-200 bg-indigo-50">
                <h3 className="text-lg font-bold text-indigo-900 mb-3">✈️ Travel & Luck</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p><strong>Lucky Hours:</strong> {displayData.luckyHours}</p>
                  <p><strong>Lucky Colors:</strong> {displayData.luckyColors}</p>
                  <p><strong>Lucky Numbers:</strong> {displayData.luckyNumbers}</p>
                </div>
              </Card>
            </div>

            {/* Do's & Don'ts */}
            {displayData.dosDonts && (
              <Card className="p-6 border-2 border-purple-200 bg-purple-50">
                <h3 className="text-lg font-bold text-purple-900 mb-4">✨ Do's & Don'ts</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Do's:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {displayData.dosDonts.filter(item => item.includes('✓')).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-green-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Don'ts:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {displayData.dosDonts.filter(item => item.includes('✗')).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-red-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DailyHoroscope;
