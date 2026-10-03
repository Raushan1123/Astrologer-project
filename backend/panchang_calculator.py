"""
Panchang Calculator - Vedic Calendar System
More accurate calculations with astronomical data
"""

from datetime import datetime, timedelta
import math
import json

class PanchangCalculator:
    """
    Calculates Panchang (Hindu calendar) elements
    with improved accuracy and descriptive content
    """

    # Nakshatra (27 lunar mansions) with detailed info
    NAKSHATRAS = {
        0: {
            'name': 'Ashwini',
            'symbol': '♈',
            'ruling_planet': 'Ketu',
            'element': 'Fire',
            'description': 'The Star of Horsewoman. Represents swift action, healing, and new beginnings. Ashwini natives are pioneers who initiate new ventures with courage.',
            'characteristics': 'Quick, active, courageous, spontaneous, healer',
            'best_for': 'Travel, business initiation, healing practices, journeys',
            'avoid': 'Stagnation, delays, conservative approaches',
            'favorable_activities': 'Starting new projects, medical treatments, travel',
            'ruling_deity': 'Ashwini Kumara (Celestial Physicians)'
        },
        1: {
            'name': 'Bharani',
            'symbol': '♈',
            'ruling_planet': 'Venus',
            'element': 'Fire',
            'description': 'The Star of Restraint. Represents creativity, passion, and moral responsibility. Bharani natives are artists and protectors of dharma.',
            'characteristics': 'Creative, passionate, responsible, challenging, nurturing',
            'best_for': 'Artistic endeavors, protective actions, problem-solving',
            'avoid': 'Extreme indulgence, irresponsibility',
            'favorable_activities': 'Creative projects, family bonding, discipline building',
            'ruling_deity': 'Yama (Lord of Death & Dharma)'
        },
        2: {
            'name': 'Krittika',
            'symbol': '♈',
            'ruling_planet': 'Sun',
            'element': 'Fire',
            'description': 'The Star of Fire. Represents divine power, purification, and warrior spirit. Krittika natives are sharp-minded and courageous.',
            'characteristics': 'Sharp, brilliant, critical, courageous, purifying',
            'best_for': 'Ceremonies, warrior activities, cleaning/purification',
            'avoid': 'Harsh criticism, aggression',
            'favorable_activities': 'Purification rituals, bold actions, cleansing',
            'ruling_deity': 'Agni (Lord of Fire)'
        },
        3: {
            'name': 'Rohini',
            'symbol': '♉',
            'ruling_planet': 'Moon',
            'element': 'Earth',
            'description': 'The Star of Ascent. Represents growth, abundance, and beauty. Rohini natives are stable, fertile, and emotionally balanced.',
            'characteristics': 'Stable, fertile, beautiful, emotional, growth-oriented',
            'best_for': 'Planting, building, romantic connections, artistic pursuits',
            'avoid': 'Sudden changes, harsh environments',
            'favorable_activities': 'Construction, gardening, romance, creation',
            'ruling_deity': 'Brahma (Creator of Universe)'
        },
        4: {
            'name': 'Mrigashirsha',
            'symbol': '♉',
            'ruling_planet': 'Mercury',
            'element': 'Air',
            'description': 'The Star of Inquiry. Represents curiosity, intelligence, and seeking. Mrigashirsha natives are explorers and communicators.',
            'characteristics': 'Curious, intelligent, seeking, communicative, restless',
            'best_for': 'Learning, writing, short journeys, exploration',
            'avoid': 'Illusions, deception, excessive wandering',
            'favorable_activities': 'Study, research, communication, short travels',
            'ruling_deity': 'Soma (Moon God)'
        },
        5: {
            'name': 'Ardra',
            'symbol': '♊',
            'ruling_planet': 'Rahu',
            'element': 'Air',
            'description': 'The Star of Tears. Represents transformation, learning through hardship, and divine knowledge. Ardra natives are profound thinkers.',
            'characteristics': 'Intense, transformative, intelligent, determined, tearful',
            'best_for': 'Spiritual learning, transformation, cleansing',
            'avoid': 'Destructive actions, excessive emotion',
            'favorable_activities': 'Meditation, spiritual learning, transformation work',
            'ruling_deity': 'Rudra (Fierce Form of Shiva)'
        },
        6: {
            'name': 'Punarvasu',
            'symbol': '♊',
            'ruling_planet': 'Jupiter',
            'element': 'Air',
            'description': 'The Star of Return. Represents renewal, restoration, and repeated blessings. Punarvasu natives are fortunate and prosperous.',
            'characteristics': 'Fortunate, restoring, generous, learned, returning',
            'best_for': 'Recovery from illness, restoration, spiritual practices, renewal',
            'avoid': 'Lingering in past, stagnation',
            'favorable_activities': 'Healing, restoration, religious practices, travel',
            'ruling_deity': 'Aditi (Mother of Gods)'
        },
        7: {
            'name': 'Pushya',
            'symbol': '♋',
            'ruling_planet': 'Saturn',
            'element': 'Water',
            'description': 'The Star of Nourishment. Represents growth, support, and prosperity. Pushya natives are nourished by life and support others.',
            'characteristics': 'Nourishing, supportive, prosperous, stable, spiritual',
            'best_for': 'Ceremonies, donations, spiritual practices, growth',
            'avoid': 'Selfish pursuits, neglecting others',
            'favorable_activities': 'Religious rituals, charity, spiritual growth, nurturing',
            'ruling_deity': 'Brihaspati (Jupiter/Guru)'
        },
        8: {
            'name': 'Ashlesha',
            'symbol': '♋',
            'ruling_planet': 'Mercury',
            'element': 'Water',
            'description': 'The Star of Intensity. Represents hidden depths, transformation, and mystery. Ashlesha natives are secretive and psychologically deep.',
            'characteristics': 'Intense, secretive, transformative, mysterious, subtle',
            'best_for': 'Secret ventures, hidden knowledge, healing work',
            'avoid': 'Deceit, venom, manipulation',
            'favorable_activities': 'Research, psychology, hidden knowledge, healing',
            'ruling_deity': 'Nagas (Serpent Deities)'
        },
        9: {
            'name': 'Magha',
            'symbol': '♌',
            'ruling_planet': 'Ketu',
            'element': 'Fire',
            'description': 'The Star of Power. Represents authority, ancestry, and kingly qualities. Magha natives are majestic and honor traditions.',
            'characteristics': 'Authoritative, regal, honorable, ancestral, powerful',
            'best_for': 'Leadership, ceremonies honoring ancestors, authority roles',
            'avoid': 'Arrogance, disrespecting traditions',
            'favorable_activities': 'Leadership roles, ceremonies, tradition honor, authority',
            'ruling_deity': 'Pitris (Ancestors)'
        },
        10: {
            'name': 'Purva Phalguni',
            'symbol': '♌',
            'ruling_planet': 'Venus',
            'element': 'Fire',
            'description': 'The Star of Former Success. Represents creativity, enjoyment, and prosperity. Purva Phalguni natives are artistic and charismatic.',
            'characteristics': 'Creative, charismatic, prosperous, entertaining, sensual',
            'best_for': 'Creative projects, entertainment, romance, pleasure',
            'avoid': 'Excess indulgence, destructive behavior',
            'favorable_activities': 'Arts, entertainment, romance, creative expression',
            'ruling_deity': 'Aryaman (Prosperity & Friendship)'
        },
        11: {
            'name': 'Uttara Phalguni',
            'symbol': '♌',
            'ruling_planet': 'Sun',
            'element': 'Fire',
            'description': 'The Star of Later Success. Represents stability, prosperity, and ethical power. Uttara Phalguni natives are just and prosperous.',
            'characteristics': 'Just, prosperous, stable, humble, ethical',
            'best_for': 'Relationships, marriages, ethical ventures, service',
            'avoid': 'Dishonesty, arrogance, exploitation',
            'favorable_activities': 'Marriage, partnerships, ethical service, stability',
            'ruling_deity': 'Bhaga (Lord of Prosperity & Marriage)'
        },
        12: {
            'name': 'Hasta',
            'symbol': '♍',
            'ruling_planet': 'Mercury',
            'element': 'Earth',
            'description': 'The Star of Skill. Represents dexterity, precision, and cunning intelligence. Hasta natives are skilled and clever communicators.',
            'characteristics': 'Skillful, dexterous, clever, communicative, precise',
            'best_for': 'Craftsmanship, communication, contracts, trade',
            'avoid': 'Theft, deception, careless mistakes',
            'favorable_activities': 'Trade, contracts, communication, skilled work',
            'ruling_deity': 'Savitar (Stimulator & Galvanizer)'
        },
        # ... (continuing for remaining 15 nakshatras)
    }

    # Tithi (30 lunar days) with detailed descriptions
    TITHIS = {
        1: {
            'name': 'Pratipada (New Moon Day 1)',
            'phase': 'Waxing',
            'element': 'Fire',
            'description': 'First day of lunar month. Represents new beginnings, growth, and fresh energy. Excellent for starting new ventures.',
            'best_for': 'Starting new projects, ceremonies, initiations',
            'avoid': 'Completing projects, finalizations',
            'lunar_day': 1,
            'significance': 'The beginning of all lunar cycles'
        },
        15: {
            'name': 'Purnima (Full Moon)',
            'phase': 'Full',
            'element': 'Water',
            'description': 'Full moon day. Represents completion, manifestation, and spiritual fulfillment. Powerful day for spiritual practices.',
            'best_for': 'Spiritual practices, meditation, manifestation, conclusions',
            'avoid': 'Starting new ventures, aggressive actions',
            'lunar_day': 15,
            'significance': 'Peak of lunar energy, perfect completion'
        },
        30: {
            'name': 'Amavasya (New Moon)',
            'phase': 'Dark',
            'element': 'Air',
            'description': 'Darkest night of lunar month. Represents introspection, release, and karmic clearing. Powerful for spiritual work.',
            'best_for': 'Meditation, introspection, releasing old patterns, spiritual practices',
            'avoid': 'Starting important ventures',
            'lunar_day': 30,
            'significance': 'Deepest inward focus, karmic purification'
        },
    }

    # Yogas (27 auspicious combinations)
    YOGAS = {
        1: {
            'name': 'Vishkambha',
            'description': 'Remover of obstacles. Excellent day for overcoming difficulties and removing barriers.',
            'favorable': True,
            'best_for': 'Removing obstacles, problem-solving, healing'
        },
        2: {
            'name': 'Preeti',
            'description': 'Joy and affection. Favorable for relationships, love, and social harmony.',
            'favorable': True,
            'best_for': 'Romance, relationships, social gatherings, harmony'
        },
        # ... (continuing for remaining yogas)
    }

    # Karana (half tithis)
    KARANAS = {
        1: {
            'name': 'Bava',
            'description': 'Represents elements and material gains. Good for material ventures.',
            'type': 'Fixed'
        },
        2: {
            'name': 'Balava',
            'description': 'Represents strength and stability. Good for all activities.',
            'type': 'Fixed'
        },
        # ... (continuing for remaining karanas)
    }

    @staticmethod
    def calculate_sunrise_sunset(date, latitude, longitude):
        """
        Calculate sunrise and sunset using astronomical algorithms
        Based on solar declination and latitude
        """
        # Simplified calculation - for production use proper ephemeris
        day_of_year = date.timetuple().tm_yday

        # Solar declination in degrees
        solar_declination = 23.44 * math.sin(math.radians((360/365) * (day_of_year - 81)))

        # Hour angle
        lat_rad = math.radians(latitude)
        decl_rad = math.radians(solar_declination)

        cos_h = -math.tan(lat_rad) * math.tan(decl_rad)
        cos_h = max(-1, min(1, cos_h))  # Clamp between -1 and 1

        h = math.acos(cos_h) * (180 / math.pi)

        # Time in minutes from solar noon (UTC)
        sunrise_offset = -(h * 4 + 4 * longitude) / 60  # in hours
        sunset_offset = (h * 4 - 4 * longitude) / 60   # in hours

        # Solar noon at 12:00 UTC (approximate)
        solar_noon = 12

        sunrise_utc = solar_noon + sunrise_offset
        sunset_utc = solar_noon + sunset_offset

        # Convert to IST (UTC+5:30)
        sunrise_ist = sunrise_utc + 5.5
        sunset_ist = sunset_utc + 5.5

        # Adjust for date wraparound
        if sunrise_ist < 0:
            sunrise_ist += 24
        if sunset_ist >= 24:
            sunset_ist -= 24

        return format_time(sunrise_ist), format_time(sunset_ist)

    @staticmethod
    def calculate_tithi(date, location):
        """
        Calculate Tithi (lunar day) based on Moon's phase
        More accurate calculation using lunar age
        """
        # Simplified: Use lunar age based on known New Moon
        # Reference New Moon: January 29, 2020
        reference_date = datetime(2020, 1, 29)
        lunar_cycle = 29.53  # days

        days_since = (date - reference_date).days
        lunar_age = (days_since % lunar_cycle) + 1  # 1-29.53

        # Tithi is 1/30th of lunar month
        tithi_num = min(30, max(1, int(lunar_age * (30 / lunar_cycle))))

        return tithi_num

    @staticmethod
    def calculate_nakshatra(date, location):
        """
        Calculate Nakshatra (lunar mansion)
        27 divisions of zodiac = ~13.33 degrees each
        """
        # Simplified calculation
        # Reference: Ashwini started on known date
        reference_date = datetime(1900, 1, 1)
        days_passed = (date - reference_date).days

        # Sidereal period = 27.32 days
        sidereal_period = 27.32

        nakshatra_index = int((days_passed / sidereal_period) % 27)

        return nakshatra_index

    @staticmethod
    def get_chaughadiya(date, sunrise_hour, sunset_hour, location):
        """
        Calculate Chaughadiya (8 time periods per day/night)
        Each period is (sunset - sunrise) / 8 duration
        """
        day_duration = sunset_hour - sunrise_hour
        period_duration = day_duration / 8

        # Chaughadiya rulers for day (varies by day of week)
        day_rulers = {
            0: ['Char', 'Labha', 'Amrita', 'Kaal', 'Labha', 'Amrita', 'Kaal', 'Labha'],      # Mon
            1: ['Labha', 'Amrita', 'Kaal', 'Labha', 'Amrita', 'Kaal', 'Labha', 'Amrita'],   # Tue
            2: ['Amrita', 'Kaal', 'Labha', 'Amrita', 'Kaal', 'Labha', 'Amrita', 'Kaal'],    # Wed
            3: ['Kaal', 'Labha', 'Amrita', 'Kaal', 'Labha', 'Amrita', 'Kaal', 'Labha'],     # Thu
            4: ['Labha', 'Amrita', 'Kaal', 'Labha', 'Amrita', 'Kaal', 'Labha', 'Amrita'],   # Fri
            5: ['Amrita', 'Kaal', 'Labha', 'Amrita', 'Kaal', 'Labha', 'Amrita', 'Kaal'],    # Sat
            6: ['Char', 'Labha', 'Amrita', 'Kaal', 'Labha', 'Amrita', 'Kaal', 'Labha'],     # Sun
        }

        weekday = date.weekday()
        rulers = day_rulers.get(weekday, day_rulers[0])

        chaughadiya_periods = []
        for i in range(8):
            start_time = sunrise_hour + (i * period_duration)
            end_time = start_time + period_duration

            chaughadiya_periods.append({
                'index': i + 1,
                'ruler': rulers[i],
                'start': format_time(start_time),
                'end': format_time(end_time),
                'type': 'Auspicious' if rulers[i] == 'Labha' else 'Most Auspicious' if rulers[i] == 'Amrita' else 'Inauspicious'
            })

        return chaughadiya_periods

    @staticmethod
    def get_hora(date, sunrise_hour):
        """
        Calculate Hora (hourly divisions)
        12 hours day, 12 hours night
        Planetary rulers: Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars
        """
        # Hora rulers for day based on day of week
        day_hora_rulers = {
            0: ['Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus'],  # Mon
            1: ['Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'],  # Tue
            # ... (continuing for all weekdays)
        }

        weekday = date.weekday()
        rulers = day_hora_rulers.get(weekday, day_hora_rulers[0])

        hora_periods = []
        for i in range(12):
            start_hour = sunrise_hour + i
            hora_periods.append({
                'hour': i + 1,
                'start': format_time(start_hour),
                'end': format_time(start_hour + 1),
                'ruler': rulers[i],
                'beneficial': i % 2 == 0  # Alternate beneficial
            })

        return hora_periods

def format_time(decimal_hours):
    """Convert decimal hours to HH:MM format"""
    hours = int(decimal_hours)
    minutes = int((decimal_hours - hours) * 60)
    return f"{hours:02d}:{minutes:02d}"

# Example usage
if __name__ == "__main__":
    calc = PanchangCalculator()
    date = datetime(2026, 10, 4)

    # Bengaluru coordinates
    latitude = 12.9716
    longitude = 77.5946

    sunrise, sunset = calc.calculate_sunrise_sunset(date, latitude, longitude)
    tithi = calc.calculate_tithi(date, 'Bengaluru')
    nakshatra = calc.calculate_nakshatra(date, 'Bengaluru')

    print(f"Date: {date}")
    print(f"Sunrise: {sunrise}, Sunset: {sunset}")
    print(f"Tithi: {tithi}, Nakshatra: {nakshatra}")
