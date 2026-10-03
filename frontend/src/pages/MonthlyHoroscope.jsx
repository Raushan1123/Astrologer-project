import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Moon, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const MonthlyHoroscope = () => {
  const [selectedSign, setSelectedSign] = useState('Aries');

  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  const monthName = new Date().toLocaleString('default', { month: 'long' });

  const monthlyHoroscopes = {
    Aries: {
      symbol: '♈',
      color: 'from-red-600 to-orange-600',
      dateRange: 'Mar 21 - Apr 19',
      element: 'Fire',
      rulingPlanet: 'Mars',
      monthAtGlance: `${monthName} brings powerful growth and expansion for Aries. This is a month of dynamic energy, bold initiatives, and significant achievements. Mars, your ruling planet, propels you forward with determination and courage. Leadership opportunities emerge as your confidence peaks. Financial gains are likely through your professional efforts. Relationships deepen through sincere communication. Overall, this promises to be a transformative month of progress and recognition.`,
      planetaryEvents: `Major planetary movements this month include a Full Moon mid-month that illuminates your sector of achievements and public recognition. Mars aspects favor bold action. Mercury supports clear communication. Venus brings harmony to relationships. No major retrograde periods affect you adversely this month.`,
      week1: 'Week 1 is about reflection and strategic planning. Use this time to set clear intentions and assess past accomplishments. Financial planning begins to bear fruit. Social connections deepen. Career matters require focus—establish clear goals.',
      week2: 'Week 2 brings dynamic energy and action. Mars empowers bold initiatives. This is an excellent time for important meetings, presentations, or negotiations. Romance heats up significantly. Career advancement accelerates. Financial opportunities emerge.',
      week3: 'Week 3 requires strategic thinking and careful decision-making. Avoid impulsive financial moves. This is a good time for introspection and gathering information. Professional matters benefit from patience and planning. Relationships require understanding and compromise.',
      week4: 'Week 4 brings closure and completion. Ongoing matters near resolution. Celebrate achievements and recognize your progress. Financial gains from mid-month initiatives come to fruition. Relationships reach a harmonious balance. Month ends on a high note.',
      relationships: 'Passionate and exciting energy surrounds relationships this month. For singles: An interesting meeting is highly possible, especially mid-month. Chemistry is instant when you encounter someone intriguing. For couples: Deepen bonds through sincere conversations and shared adventures. Plan romantic getaways or special moments together. Understanding and compromise strengthen your connection.',
      professional: 'Professional growth is assured this month. Your hard work gains recognition. Leadership opportunities emerge as others trust your judgment. Career advancement through promotions or new projects is possible. Financial benefits accompany professional success. Collaborations flourish when you lead with confidence.',
      resources: 'Monetary gains through work and investments are likely. Avoid overspending in week 3. Overall, financial prospects are positive. Build your savings. Long-term investments show promise. Budget carefully but invest confidently in your future.',
      dailyBalance: 'Maintain physical energy through exercise and adequate rest. Mental clarity supports decision-making. Emotional balance requires managing stress through meditation or yoga. Social activities boost overall wellness. Follow health routines consistently.',
      auspiciousDates: '5th, 12th, 19th, 26th',
      warningsAdvice: 'Avoid overconfidence in your abilities. Do not make hasty financial decisions in week 3. Be mindful of others\' perspectives. Don\'t overwork yourself despite high energy levels.',
      remedies: ['Perform Mars Puja on Tuesdays', 'Wear red or orange clothing on important days', 'Donate red items to those in need', 'Practice breathing exercises (Pranayama) daily', 'Maintain a structured routine'],
      luckyColors: 'Red, Orange, Gold',
      luckyNumbers: '1, 5, 9'
    },
    Taurus: {
      symbol: '♉',
      color: 'from-green-600 to-emerald-600',
      dateRange: 'Apr 20 - May 20',
      element: 'Earth',
      rulingPlanet: 'Venus',
      monthAtGlance: `${monthName} brings stability and material prosperity to Taurus. This is a month for building solid foundations and secure futures. Venus, your ruling planet, supports financial growth and relationship harmony. Career progress is steady and reliable. Home and family matters improve significantly. Financial gains are assured through careful planning and dedication. Relationships deepen through consistent commitment. This is an ideal month for major decisions affecting long-term security.`,
      planetaryEvents: `Venus creates favorable aspects for finances and relationships this month. A New Moon early in the month supports new beginnings in home and finances. Mercury aids clear communication in professional matters. Overall planetary movements support stability and growth without major challenges.`,
      week1: 'Week 1 emphasizes family and home improvements. Household projects bring satisfaction. Financial planning produces results. Family bonding strengthens. Quality time with loved ones is rewarding and restorative.',
      week2: 'Week 2 highlights professional advancement and financial growth. Your reliability gains recognition. Collaborations succeed beautifully. Work projects show excellent progress. Financial gains come through dedication and competence. This is ideal for securing promotions or bonuses.',
      week3: 'Week 3 brings social opportunities and networking benefits. Friendships deepen. Creative projects flourish. Social gatherings bring joy and connection. Financial benefits come through networking and social connections.',
      week4: 'Week 4 is introspective and peaceful. Rest and recharge. Financial planning concludes successfully. Spiritual growth is highlighted. Peace and harmony permeate your life as the month ends.',
      relationships: 'Romance progresses steadily and securely this month. For couples: Deepening trust and stability in relationships. Show commitment through consistent actions. For singles: Meeting someone grounded, reliable, and genuinely interested in long-term connection. Relationships built on solid foundations flourish.',
      professional: 'Steady career progress defines the month. Your dedication and reliability are highly valued. Salary increases or new opportunities may arise. Teamwork is harmonious. Financial benefits accompany career growth. Security and stability in professional matters are assured.',
      resources: 'Strong financial growth through work and wise investments. Income remains stable with growth potential. Investments show good returns. Savings increase steadily. Building long-term financial security is supported. Property investments are particularly favorable.',
      dailyBalance: 'Excellent health throughout the month. Maintain consistent health routines for best results. Good nutrition and regular exercise strengthen your body. Digestion and immunity are strong. Mental wellness improves with consistent self-care.',
      auspiciousDates: '4th, 11th, 18th, 25th',
      warningsAdvice: 'Don\'t rush major financial decisions despite growth prospects. Resist the urge to overspend on luxury items. Be patient with slow progress in any area. Don\'t neglect family in pursuit of career goals.',
      remedies: ['Wear emerald gemstone', 'Plant trees and flowers', 'Offer flowers to Venus daily', 'Keep fresh flowers at home', 'Practice gratitude and appreciation'],
      luckyColors: 'Green, Blue, Turquoise',
      luckyNumbers: '2, 4, 6'
    },
    Gemini: {
      symbol: '♊',
      color: 'from-yellow-500 to-orange-500',
      dateRange: 'May 21 - Jun 20',
      element: 'Air',
      rulingPlanet: 'Mercury',
      monthAtGlance: `${monthName} is your month to shine through communication excellence. This period brings remarkable networking and learning opportunities. Mercury, your ruling planet, supports breakthrough communication. Travel and short journeys open unexpected doors. Writing, teaching, and presentation work flourish. Professional advancement through words and ideas is highlighted. Relationships deepen through open communication. This is an ideal month for launching communication-based projects.`,
      planetaryEvents: `Mercury is strong this month, supporting excellent communication and networking. A Full Moon mid-month illuminates your sector of learning and growth. Short-distance travel is particularly favorable. Overall planetary aspects support intellectual pursuits and connection-building.`,
      week1: 'Week 1 highlights important conversations leading to breakthroughs. Writing projects progress well. Communication brings positive outcomes. Travel opportunities arise. Relationships improve through sincere dialogue and active listening.',
      week2: 'Week 2 is prime networking time. Social connections multiply opportunities. Short journeys bring beneficial encounters. Career advances through communication skills. Learning opportunities peak. Your words carry influence and power.',
      week3: 'Week 3 focuses on knowledge expansion and mastery. Educational pursuits flourish magnificently. Intellectual achievements receive recognition. Career growth through expertise. Teaching and mentoring opportunities arise. Share your knowledge generously.',
      week4: 'Week 4 consolidates your learning and achievements. Organize and integrate new knowledge. Communicate your accomplishments. Financial returns from intellectual work arrive. Prepare for specialized pursuits or new ventures.',
      relationships: 'Romance thrives through communication and intellectual connection this month. For couples: Meaningful conversations strengthen bonds. Wit and humor enhance connection. For singles: Meeting someone clever and engaging. Relationships flourish when built on compatible communication styles.',
      professional: 'Outstanding career success through communication skills this month. Writing, teaching, sales, or media work prospers. Networking leads to significant advancement. Your ideas are valued and implemented. Presentations and pitches succeed brilliantly. Recognition for your communication abilities is assured.',
      resources: 'Good financial prospects through communication-based work. Short-term investments show returns. Income increases through professional communication. Networking leads to financial opportunities. Avoid over-commitment to financial ventures.',
      dailyBalance: 'Mental clarity peaks this month. Nervous system is balanced and calm. Movement and short travels aid wellness. Breathing exercises and meditation reduce stress. Stay positive and mentally engaged.',
      auspiciousDates: '6th, 13th, 20th, 27th',
      warningsAdvice: 'Avoid excessive gossip or spreading misinformation. Don\'t overcommit to too many projects simultaneously. Be cautious in communication—words have power. Don\'t neglect practical responsibilities for intellectual pursuits.',
      remedies: ['Wear yellow or green gemstone', 'Learn something new this month', 'Practice honest communication', 'Take short journeys or day trips', 'Write regularly or journal'],
      luckyColors: 'Yellow, Green, White',
      luckyNumbers: '3, 5, 7'
    },
    Cancer: {
      symbol: '♋',
      color: 'from-blue-600 to-indigo-600',
      dateRange: 'Jun 21 - Jul 22',
      element: 'Water',
      rulingPlanet: 'Moon',
      monthAtGlance: `${monthName} is deeply transformative for Cancer. Home, family, and emotional matters reach new significance. The Moon, your ruling planet, deeply influences your journey. Financial improvements come through resourcefulness and family wisdom. Career benefits from emotional intelligence and intuitive decisions. This month brings emotional maturity, deepened family bonds, and significant progress in creating emotional security. Your intuition is your greatest asset this month.`,
      planetaryEvents: `The Moon's strong influence supports emotional growth and family harmony. A New Moon early in the month supports new home-based endeavors. Water element emphasis aids intuitive decision-making. Overall energies support introspection and emotional healing.`,
      week1: 'Week 1 emphasizes home and family improvements. Household projects bring deep satisfaction. Emotional clarity develops naturally. Family bonding strengthens significantly. Financial matters related to property and home progress favorably.',
      week2: 'Week 2 highlights emotional growth and creativity peaks. Intuition guides important decisions beautifully. Family celebrations occur. Home becomes more beautiful and secure. Creative projects flourish.',
      week3: 'Week 3 deepens personal and family relationships. Support from loved ones aids your growth. Career benefits from emotional intelligence. Understanding and compassion strengthen all connections. Professional relationships improve.',
      week4: 'Week 4 brings consolidation and reflection. Family bonds are stronger than ever. Emotional maturity achieved. Financial security improves noticeably. Spiritual growth concludes the month peacefully.',
      relationships: 'Deep emotional connections flourish this month. For couples: Vulnerability creates closeness and intimacy. For singles: Meeting someone emotionally mature and caring. Family relationships improve significantly. This month supports love built on emotional understanding.',
      professional: 'Career advancement through care-based professions. Emotional intelligence enhances leadership. Home-based work opportunities arise favorably. Team dynamics improve through compassion. Your nurturing approach gains recognition.',
      resources: 'Financial security improves through wise planning. Home and property investments are beneficial. Family finances stabilize and grow. Savings increase through careful management. Long-term financial security is assured.',
      dailyBalance: 'Emotional wellness is paramount this month. Address stress through family support and self-care. Physical health improves with emotional stability. Digestion and immunity strengthen. Rest is as important as activity.',
      auspiciousDates: '2nd, 9th, 16th, 23rd, 30th',
      warningsAdvice: 'Don\'t let emotions override practical decisions. Avoid overindulgence in comfort foods when stressed. Be honest about your emotional needs. Don\'t isolate when family support is available.',
      remedies: ['Wear silver or white gemstone', 'Spend quality time with family', 'Help single women or mothers', 'Keep moon-related items at home', 'Practice self-care and pampering'],
      luckyColors: 'White, Silver, Blue',
      luckyNumbers: '2, 4, 7'
    },
    Leo: {
      symbol: '♌',
      color: 'from-yellow-600 to-red-600',
      dateRange: 'Jul 23 - Aug 22',
      element: 'Fire',
      rulingPlanet: 'Sun',
      monthAtGlance: `${monthName} is YOUR month to shine brilliantly, Leo! Recognition, appreciation, and success are assured. Your ruling planet, the Sun, radiates brilliantly. Creativity reaches new heights. Romance and pleasure dominate your experience. Your confidence attracts unprecedented opportunities. This month validates your talents and establishes your importance. Personal triumph and celebration are themes. This is a month of personal power and achievement.`,
      planetaryEvents: `The Sun empowers you magnificently this month. Multiple positive aspects support recognition and success. A Full Moon mid-month illuminates your sector of achievement. Venus brings romance. Overall planetary movements strongly support your personal triumph.`,
      week1: 'Week 1 highlights self-expression and talent showcase. Your gifts are recognized immediately. Recognition begins flowing. Romance possibilities increase. Confidence attracts positive attention from all directions.',
      week2: 'Week 2 is your peak performance quarter. Success in all projects and endeavors is assured. Public recognition is substantial and meaningful. Romantic connections deepen significantly. Financial gains accompany recognition and admiration.',
      week3: 'Week 3 sustains your success and achievements. Achievements continue magnificently. Leadership opportunities expand substantially. Admiration from peers increases. Creative projects near completion with excellence.',
      week4: 'Week 4 brings celebration and consolidation. Celebrate major achievements enthusiastically. Prepare for leadership roles ahead. Month ends triumphantly. Financial rewards are substantial and deserved.',
      relationships: 'Romance is prominent and fulfilling this month. For couples: Passionate connection deepens beautifully. For singles: Attracting admirers effortlessly through natural magnetism. Relationships are fulfilling and joyful. This month supports romantic fulfillment.',
      professional: 'Career shines brilliantly with promotions and recognition assured. Your talents receive spotlight and praise. Leadership opportunities multiply substantially. Professional success is outstanding. Your performance stands out remarkably.',
      resources: 'Outstanding financial growth accompanies career success. Income increases significantly. Investments prosper beautifully. Spending on pleasure is justified and affordable. Financial confidence grows immensely.',
      dailyBalance: 'Vitality is exceptional throughout the month. Heart health is excellent. Physical energy is remarkably high. Engage enthusiastically in activities you love. Joy directly aids overall wellness.',
      auspiciousDates: '1st, 8th, 15th, 22nd, 29th',
      warningsAdvice: 'Don\'t let pride overshadow humility and grace. Avoid arrogance in your success. Don\'t neglect others in your moment of glory. Don\'t overspend despite financial gains.',
      remedies: ['Wear gold or orange items regularly', 'Worship the Sun daily', 'Donate to charity generously', 'Help those in genuine need', 'Practice daily gratitude'],
      luckyColors: 'Gold, Orange, Red',
      luckyNumbers: '1, 5, 9'
    },
    Virgo: {
      symbol: '♍',
      color: 'from-green-600 to-gray-600',
      dateRange: 'Aug 23 - Sep 22',
      element: 'Earth',
      rulingPlanet: 'Mercury',
      monthAtGlance: `${monthName} is a month of introspection and spiritual growth for Virgo. Outwardly quiet, but internally you're evolving profoundly. Rest and reflection are important themes. Career takes a supportive role to inner development. This month prepares you for greater responsibilities ahead. Spiritual practices deepen. Physical health improves through attention and care. This quiet month sets foundations for future success.`,
      planetaryEvents: `Mercury supports analytical thinking and organization. A New Moon early in the month supports introspection. Overall energies favor inner work and spiritual development. Quiet reflection is supported by all planetary aspects.`,
      week1: 'Week 1 turns focus inward beautifully. Meditation and spiritual practices gain importance. Career aspects remain stable but not fast-paced. Health routines improve noticeably. Quiet reflection guides important decisions wisely.',
      week2: 'Week 2 shows slow but steady progress. Work continues reliably and competently. Healing and recovery are emphasized. Relationships are peaceful and supportive. Financial matters are stable without dramatic changes.',
      week3: 'Week 3 is a preparation phase for future activities. Laying groundwork for upcoming projects. Organizing and planning behind the scenes. Building reserves and resources for future ventures.',
      week4: 'Week 4 brings renewed energy and spiritual clarity. Feeling stronger emotionally and spiritually. Month ends in peace and contentment. Ready to enter a more active phase in coming months.',
      relationships: 'Relationships are peaceful and deeply supportive this month. For couples: Deep mutual understanding develops. For singles: Meeting someone equally grounded and reliable. Stability and trust characterize love this month.',
      professional: 'Career progresses steadily and reliably. Your dependability is highly valued. Promotion may arrive later. Focus on developing skills for future advancement. Lay crucial groundwork for future success.',
      resources: 'Financial stability throughout the month. Modest but consistent income growth. Savings increase steadily through careful management. Avoid speculation or risky ventures. Build your emergency fund.',
      dailyBalance: 'Health improves through better routines. Mental wellness peaks through consistent meditation. Digestive system strengthens significantly. Physical activity helps but shouldn\'t be strenuous. Overall vitality increases gradually.',
      auspiciousDates: '3rd, 10th, 17th, 24th',
      warningsAdvice: 'Don\'t become overly withdrawn or isolated. Avoid perfectionism in spiritual practice. Don\'t neglect social connections entirely. Don\'t underestimate the value of this quiet period.',
      remedies: ['Wear green or gray gemstone', 'Practice yoga and meditation', 'Keep workspace organized', 'Help elders and sick people', 'Maintain consistent daily routines'],
      luckyColors: 'Green, Gray, Blue',
      luckyNumbers: '3, 6, 9'
    },
    Libra: {
      symbol: '♎',
      color: 'from-pink-500 to-purple-600',
      dateRange: 'Sep 23 - Oct 22',
      element: 'Air',
      rulingPlanet: 'Venus',
      monthAtGlance: `${monthName} is a month of joy, romance, and social connection for Libra. Creativity flourishes beautifully. Social connections deepen meaningfully. Pleasure and beauty are highlighted themes. Your ruling planet, Venus, supports romantic flourishing and aesthetic appreciation. Financial harmony improves. This month celebrates love, beauty, and meaningful relationships. Overall, expect a delightful and fulfilling month of connection.`,
      planetaryEvents: `Venus creates harmonious aspects for relationships and finances. A Full Moon mid-month illuminates your sector of romance and creativity. Mercury aids clear, kind communication. Overall planetary energies strongly support social harmony and personal joy.`,
      week1: 'Week 1 brings happiness through social activities and gatherings. Events and celebrations are enjoyable. Relationships deepen meaningfully. Social gatherings are particularly beneficial.',
      week2: 'Week 2 highlights romance and creative expression perfectly. Artistic pursuits succeed magnificently. Love flourishes beautifully. Social appeal peaks remarkably. Romance possibilities are abundant.',
      week3: 'Week 3 focuses on home and family harmony. Family matters improve significantly. Home beautification brings satisfaction. Family relationships strengthen through quality time.',
      week4: 'Week 4 emphasizes communication and learning beautifully. Exchange ideas and knowledge. Neighbors and siblings bring joy. Financial matters conclude positively.',
      relationships: 'Romance blooms beautifully this month. For couples: Romantic gestures and communication strengthen love. For singles: Social events bring romantic possibilities. Relationships are fulfilling and joyful.',
      professional: 'Career partnerships and collaborations succeed beautifully. Your diplomatic skills are highly valued. Teamwork brings success. Creative projects flourish. Professional recognition comes through cooperation.',
      resources: 'Financial balance improves noticeably. Income through partnerships is possible. Luxury spending is justified. Investments in beauty yield returns. Financial confidence grows.',
      dailyBalance: 'Overall health is balanced and positive. Beauty treatments are particularly beneficial. Mental peace aids wellness. Physical activity brings joy. Social engagement boosts overall well-being.',
      auspiciousDates: '7th, 14th, 21st, 28th',
      warningsAdvice: 'Don\'t let indecision prevent progress. Avoid over-reliance on others. Don\'t neglect your own needs for harmony. Don\'t overspend on aesthetic pursuits.',
      remedies: ['Wear pink or light blue gemstone', 'Spend time with loved ones', 'Cultivate partnerships', 'Practice meditation and yoga', 'Engage in artistic pursuits'],
      luckyColors: 'Pink, Blue, Green',
      luckyNumbers: '2, 4, 7'
    },
    Scorpio: {
      symbol: '♏',
      color: 'from-red-700 to-purple-600',
      dateRange: 'Oct 23 - Nov 21',
      element: 'Water',
      rulingPlanet: 'Mars',
      monthAtGlance: `${monthName} is intense and transformative for Scorpio. Deep emotional and psychological work brings profound growth. Home and family matters are highlighted. This month supports transformation and regeneration. Your ruling planet, Mars, empowers bold introspection. Financial improvements come through strategic thinking. Professional matters benefit from your inner strength. This is a powerful month for creating lasting change.`,
      planetaryEvents: `Mars supports strategic thinking and power. A New Moon early in the month supports new beginnings in home matters. Water element emphasis aids deep emotional processing. Overall energies support transformation and inner power.`,
      week1: 'Week 1 brings natural introspection and self-understanding. Emotional growth begins. Home improvements become important. Family bonds strengthen through deeper connection.',
      week2: 'Week 2 highlights family relationships beautifully. Quality time with loved ones strengthens bonds. Property and home matters progress favorably. Family support aids personal growth.',
      week3: 'Week 3 brings communication and self-expression opportunities. Share your thoughts and feelings. Intellectual pursuits flourish. Professional communication improves significantly.',
      week4: 'Week 4 emphasizes rest and deep reflection. The depth of your mind is revealed. Spiritual growth is highlighted. Month ends with renewed power and clarity.',
      relationships: 'Deep and passionate connections flourish this month. For couples: Intensity brings closeness. For singles: Encountering someone equally passionate. This month supports profound emotional bonding.',
      professional: 'Career benefits from strategic thinking and insight. Your understanding of complex situations is valued. Power and authority increase. Professional transformation is possible. Your dedication brings recognition.',
      resources: 'Financial gains through strategic decisions. Your investigative instincts guide good investments. Control over finances increases. Power in financial matters improves.',
      dailyBalance: 'Physical energy is intense this month. Emotional processing is necessary and healing. Facing difficult truths supports wellness. Your resilience aids overall health.',
      auspiciousDates: '5th, 12th, 19th, 26th',
      warningsAdvice: 'Don\'t let intensity become destructive. Avoid revenge or vindictive thoughts. Don\'t manipulate situations. Don\'t keep secrets that should be shared.',
      remedies: ['Wear red or black items', 'Practice meditation and yoga', 'Face difficult emotions honestly', 'Help those overcoming challenges', 'Engage in transformative work'],
      luckyColors: 'Red, Black, Maroon',
      luckyNumbers: '2, 4, 8'
    },
    Sagittarius: {
      symbol: '♐',
      color: 'from-purple-600 to-blue-600',
      dateRange: 'Nov 22 - Dec 21',
      element: 'Fire',
      rulingPlanet: 'Jupiter',
      monthAtGlance: `${monthName} brings expansion and growth to Sagittarius. New horizons open before you. Adventure and learning dominate. Your ruling planet, Jupiter, supports luck and expansion. Career advancement is significant. Travel brings new perspectives. Financial growth is assured. Relationships become more exciting. Overall, expect a month of remarkable growth and new possibilities.`,
      planetaryEvents: `Jupiter creates fortunate aspects for expansion and growth. A Full Moon mid-month illuminates your sector of adventure and learning. Mercury supports communication of new ideas. Overall energies strongly support expansion and new beginnings.`,
      week1: 'Week 1 highlights growth opportunities and expansion. New possibilities appear. Career advancements begin. Learning opportunities arise. Financial gains through expansion are possible.',
      week2: 'Week 2 brings dynamic energy and implementation. Your plans gain momentum. Professional recognition increases. Travel brings beneficial encounters. Financial growth is notable.',
      week3: 'Week 3 emphasizes learning and skill development. Educational pursuits flourish. Intellectual achievements are recognized. Career growth through expertise. Teaching opportunities arise.',
      week4: 'Week 4 brings consolidation of new opportunities. Gather and integrate new knowledge. Communicate your achievements. Financial returns arrive. Prepare for new ventures.',
      relationships: 'Adventurous and exciting energy attracts partners. Relationships become more adventurous. Couples enjoy new experiences. Singles meet someone equally adventurous. Romance is linked to shared exploration.',
      professional: 'Career advancement is significant. Growth opportunities multiply. Learning and development peak. Your enthusiasm inspires others. Professional success is outstanding.',
      resources: 'Financial expansion and growth are assured. Investments may yield returns. Income increases significantly. Overall prosperity is guaranteed. Abundance flows toward you.',
      dailyBalance: 'Physical energy is remarkably high. Enthusiasm naturally supports wellness. Outdoor activities are beneficial. Your positive outlook aids health. Movement and adventure support vitality.',
      auspiciousDates: '8th, 15th, 22nd, 29th',
      warningsAdvice: 'Don\'t over-commit to too many ventures. Avoid reckless decisions despite optimism. Don\'t neglect responsibilities. Don\'t ignore warning signs.',
      remedies: ['Wear purple or blue gemstone', 'Travel for growth and learning', 'Study and pursue education', 'Help seekers and students', 'Practice generosity'],
      luckyColors: 'Purple, Blue, Gold',
      luckyNumbers: '3, 6, 9'
    },
    Capricorn: {
      symbol: '♑',
      color: 'from-gray-700 to-black-600',
      dateRange: 'Dec 22 - Jan 19',
      element: 'Earth',
      rulingPlanet: 'Saturn',
      monthAtGlance: `${monthName} is a month of ambition and achievement for Capricorn. Structure and discipline bring excellent results. Career progress is assured. Your ruling planet, Saturn, supports achievement through dedication. Financial gains are significant. Relationships deepen through commitment. Home and family matters improve. This month validates your hard work and dedication. Achievement and recognition are assured.`,
      planetaryEvents: `Saturn supports discipline and achievement. A New Moon early in the month supports new professional ventures. Overall energies favor ambitious goals and structured progress. No major obstacles challenge your path.`,
      week1: 'Week 1 emphasizes planning and goal-setting. Lay foundations for ambitious projects. Financial planning bears fruit. Career direction becomes crystal clear.',
      week2: 'Week 2 highlights active growth and advancement. Career advances through steady work. Financial gains through your efforts. Home improvements bring satisfaction. Relationships deepen.',
      week3: 'Week 3 brings expansion of opportunities. Unexpected opportunities arise. Career acceleration increases. Financial portfolio expands. Professional growth accelerates.',
      week4: 'Week 4 consolidates all your gains. Reflect on significant achievements. Financial year-end is positive. Relationships are stronger. Month ends triumphantly.',
      relationships: 'Relationship stability improves significantly. Commitment is recognized and appreciated. For couples: Long-term bonds strengthen. For singles: Meeting someone serious and dependable. This month supports lasting connections.',
      professional: 'Career shines brightly with promotion assured. Your hard work receives recognition. Increased responsibility is coming. Authority and respect increase. Professional success is guaranteed.',
      resources: 'Financial gains through hard work and discipline. Investments mature favorably. Your practical approach yields results. Financial security improves substantially. Wealth accumulation progresses steadily.',
      dailyBalance: 'Physical strength and endurance are excellent. Building strength through consistent effort. Bones and joints are strong. Your resilience supports wellness.',
      auspiciousDates: '4th, 11th, 18th, 25th',
      warningsAdvice: 'Don\'t become too rigid in your approach. Avoid pessimism despite challenges. Don\'t overwork yourself excessively. Don\'t neglect rest and recreation.',
      remedies: ['Wear black or gray gemstone', 'Practice discipline consistently', 'Help elderly and experienced people', 'Build strong foundations', 'Practice patience'],
      luckyColors: 'Black, Gray, Brown',
      luckyNumbers: '1, 4, 8'
    },
    Aquarius: {
      symbol: '♒',
      color: 'from-blue-600 to-cyan-600',
      dateRange: 'Jan 20 - Feb 18',
      element: 'Air',
      rulingPlanet: 'Saturn',
      monthAtGlance: `${monthName} brings innovation and recognition to Aquarius. Your unique perspective shines brilliantly. Social connections deepen. Creative ideas become breakthrough achievements. Your ruling planet, Saturn, supports visionary thinking and progress. This is an ideal month for launching innovative projects. Financial gains come through originality. Relationships are strengthened through genuine connection. Overall, expect recognition for your uniqueness.`,
      planetaryEvents: `Saturn supports innovation and progress. A Full Moon mid-month illuminates your sector of friendships and community. Mercury supports communication of new ideas. Overall energies support innovation and social connection.`,
      week1: 'Week 1 highlights your aspirations and achievements. Important conversations lead to breakthroughs. Innovation is recognized. Social connections multiply. Opportunities emerge through networking.',
      week2: 'Week 2 brings recognition and appreciation. Your talents are noticed widely. Admiration increases from your community. Social appeal peaks. Networking brings substantial benefits.',
      week3: 'Week 3 brings group and community emphasis. Group efforts flourish. Collaborations are successful. Community involvement is fulfilling. Shared goals come to fruition.',
      week4: 'Week 4 consolidates your achievements. Celebrate your innovations. Financial returns from intellectual work arrive. Relationships are strengthened. Month ends with satisfaction.',
      relationships: 'Intellectual connection and freedom within love characterize relationships. For couples: Unique bonds deepen. For singles: Meeting someone equally innovative. Relationships are based on mutual respect.',
      professional: 'Career success through innovative thinking. Your unique approach is highly valued. Technology and forward-thinking succeed. Group efforts flourish. Your leadership is recognized.',
      resources: 'Financial gains through innovation and technology. Group investments may be favorable. Your unique skills bring income. Financial progress through originality.',
      dailyBalance: 'Mental wellness is excellent. Nervous system is balanced. Social activity supports health. Engaging in causes you believe in boosts wellness.',
      auspiciousDates: '6th, 13th, 20th, 27th',
      warningsAdvice: 'Don\'t become detached emotionally. Avoid eccentric behavior that isolates you. Don\'t ignore emotional needs. Don\'t be overly stubborn about new ideas.',
      remedies: ['Wear blue or silver gemstone', 'Engage in community service', 'Pursue innovative projects', 'Help humanitarian causes', 'Stay connected to groups'],
      luckyColors: 'Blue, Silver, Cyan',
      luckyNumbers: '4, 7, 11'
    },
    Pisces: {
      symbol: '♓',
      color: 'from-purple-500 to-green-600',
      dateRange: 'Feb 19 - Mar 20',
      element: 'Water',
      rulingPlanet: 'Jupiter',
      monthAtGlance: `${monthName} is deeply spiritual and creative for Pisces. Dreams manifest into reality. Spirituality deepens profoundly. Creativity flows abundantly. Your ruling planet, Jupiter, brings blessings and expansion. Financial gains come through spiritual alignment. Career benefits from intuitive decisions. Relationships deepen through soul connection. This is a month of spiritual awakening and creative manifestation.`,
      planetaryEvents: `Jupiter brings spiritual blessings. A New Moon early in the month supports spiritual intentions. Water element emphasis aids intuitive connection. Overall energies support spirituality and creativity.`,
      week1: 'Week 1 emphasizes spiritual connection and dreams. Your intuition is powerful. Spiritual practices deepen. Creative visions arise. Career decisions benefit from intuition.',
      week2: 'Week 2 highlights creativity and manifestation. Creative projects flourish magnificently. Inspiration flows abundantly. Artistic expression is celebrated. Dreams begin manifesting.',
      week3: 'Week 3 brings relationship deepening and compassion. Personal bonds strengthen through understanding. Support from loved ones aids growth. Career benefits from emotional intelligence.',
      week4: 'Week 4 consolidates spiritual growth. Reflect on spiritual progress. Emotional maturity achieved. Financial security improves. Month ends with spiritual peace.',
      relationships: 'Romantic and spiritual connection dominates. For couples: Spiritual deepening strengthens bonds. For singles: Meeting someone equally sensitive. Relationships based on soul connection flourish.',
      professional: 'Career through compassionate and creative work. Intuition guides professional decisions. Artistic and spiritual work flourishes. Your compassionate approach gains recognition.',
      resources: 'Financial intuition is strong. Unexpected gains are possible. Your generosity is rewarded. Financial and spiritual blessings flow. Trust the universe.',
      dailyBalance: 'Emotional and spiritual wellness peak. Rest and meditation are beneficial. Healing occurs through self-compassion. Physical and emotional balance.',
      auspiciousDates: '1st, 9th, 17th, 25th',
      warningsAdvice: 'Don\'t escape reality through fantasy. Avoid overly idealistic thinking. Don\'t ignore practical responsibilities. Don\'t be too gullible with others.',
      remedies: ['Wear purple or green gemstone', 'Practice meditation and yoga', 'Engage in creative pursuits', 'Help vulnerable people', 'Trust your spiritual intuition'],
      luckyColors: 'Purple, Green, White',
      luckyNumbers: '3, 6, 9, 12'
    }
  };

  const currentHoroscope = monthlyHoroscopes[selectedSign];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Monthly Horoscope - Happy Kismat"
        description="Get your detailed monthly horoscope for all 12 zodiac signs with weekly predictions and astrological insights."
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/free-kundli-tools" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Free Tools
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">🌙 Monthly Horoscope</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive monthly astrology predictions for {currentMonth} with detailed insights for all life areas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
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
                  <Moon className="w-8 h-8 mb-2" />
                  <p className="text-sm">{currentMonth}</p>
                </div>
              </div>
            </Card>

            {/* Month at a Glance */}
            <Card className="p-6 border-2 border-blue-200 bg-blue-50">
              <h3 className="text-xl font-bold text-blue-900 mb-3">📌 {monthName} at a Glance</h3>
              <p className="text-gray-700 leading-relaxed">{currentHoroscope.monthAtGlance}</p>
            </Card>

            {/* Planetary Events */}
            <Card className="p-6 border-2 border-indigo-200 bg-indigo-50">
              <h3 className="text-xl font-bold text-indigo-900 mb-3">🪐 Astrological Themes</h3>
              <p className="text-gray-700 leading-relaxed">{currentHoroscope.planetaryEvents}</p>
            </Card>

            {/* Weekly Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-2 border-green-200 bg-green-50">
                <h3 className="text-lg font-bold text-green-900 mb-3">📅 Week 1</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{currentHoroscope.week1}</p>
              </Card>

              <Card className="p-6 border-2 border-yellow-200 bg-yellow-50">
                <h3 className="text-lg font-bold text-yellow-900 mb-3">📅 Week 2</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{currentHoroscope.week2}</p>
              </Card>

              <Card className="p-6 border-2 border-orange-200 bg-orange-50">
                <h3 className="text-lg font-bold text-orange-900 mb-3">📅 Week 3</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{currentHoroscope.week3}</p>
              </Card>

              <Card className="p-6 border-2 border-red-200 bg-red-50">
                <h3 className="text-lg font-bold text-red-900 mb-3">📅 Week 4</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{currentHoroscope.week4}</p>
              </Card>
            </div>

            {/* Life Domains */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-2 border-pink-200 bg-pink-50">
                <h3 className="text-lg font-bold text-pink-900 mb-3">💕 Relationships</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{currentHoroscope.relationships}</p>
              </Card>

              <Card className="p-6 border-2 border-green-200 bg-green-50">
                <h3 className="text-lg font-bold text-green-900 mb-3">💼 Professional Life</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{currentHoroscope.professional}</p>
              </Card>

              <Card className="p-6 border-2 border-yellow-200 bg-yellow-50">
                <h3 className="text-lg font-bold text-yellow-900 mb-3">💰 Resources & Finance</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{currentHoroscope.resources}</p>
              </Card>

              <Card className="p-6 border-2 border-blue-200 bg-blue-50">
                <h3 className="text-lg font-bold text-blue-900 mb-3">⚖️ Daily Balance & Health</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{currentHoroscope.dailyBalance}</p>
              </Card>
            </div>

            {/* Auspicious Dates & Lucky Elements */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 border-2 border-purple-200 bg-purple-50">
                <h3 className="text-lg font-bold text-purple-900 mb-3">✨ Auspicious Dates</h3>
                <p className="text-3xl font-bold text-purple-600">{currentHoroscope.auspiciousDates}</p>
              </Card>

              <Card className="p-6 border-2 border-blue-200 bg-blue-50">
                <h3 className="text-lg font-bold text-blue-900 mb-3">🎨 Lucky Colors</h3>
                <p className="text-lg text-gray-700">{currentHoroscope.luckyColors}</p>
              </Card>

              <Card className="p-6 border-2 border-orange-200 bg-orange-50">
                <h3 className="text-lg font-bold text-orange-900 mb-3">🔢 Lucky Numbers</h3>
                <p className="text-lg text-gray-700">{currentHoroscope.luckyNumbers}</p>
              </Card>
            </div>

            {/* Warnings & Advice */}
            <Card className="p-6 border-2 border-red-200 bg-red-50">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-red-900 mb-3">⚠️ Warnings & Advice</h3>
                  <p className="text-gray-700">{currentHoroscope.warningsAdvice}</p>
                </div>
              </div>
            </Card>

            {/* Remedies */}
            <Card className="p-6 border-2 border-indigo-200 bg-indigo-50">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">🙏 Recommended Remedies</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {currentHoroscope.remedies.map((remedy, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded-lg">
                    <span className="text-indigo-600 font-bold">•</span>
                    <p className="text-gray-700 text-sm">{remedy}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MonthlyHoroscope;
