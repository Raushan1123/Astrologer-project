import React from 'react';
import './PlanetaryAnimation.css';

const PlanetaryAnimation = () => {
  return (
    <div className="planetary-system">
      {/* Central Sun */}
      <div className="sun">
        <div className="sun-glow"></div>
      </div>

      {/* Orbit 1 - Mercury */}
      <div className="orbit orbit-1">
        <div className="planet mercury">
          <div className="planet-glow mercury-glow"></div>
        </div>
      </div>

      {/* Orbit 2 - Venus */}
      <div className="orbit orbit-2">
        <div className="planet venus">
          <div className="planet-glow venus-glow"></div>
        </div>
      </div>

      {/* Orbit 3 - Earth */}
      <div className="orbit orbit-3">
        <div className="planet earth">
          <div className="planet-glow earth-glow"></div>
          <div className="moon-orbit">
            <div className="moon"></div>
          </div>
        </div>
      </div>

      {/* Orbit 4 - Mars */}
      <div className="orbit orbit-4">
        <div className="planet mars">
          <div className="planet-glow mars-glow"></div>
        </div>
      </div>

      {/* Orbit 5 - Jupiter */}
      <div className="orbit orbit-5">
        <div className="planet jupiter">
          <div className="planet-glow jupiter-glow"></div>
        </div>
      </div>

      {/* Orbit 6 - Saturn */}
      <div className="orbit orbit-6">
        <div className="planet saturn">
          <div className="planet-glow saturn-glow"></div>
          <div className="saturn-ring"></div>
        </div>
      </div>

      {/* Zodiac Symbols floating around */}
      <div className="zodiac-symbol zodiac-1">♈</div>
      <div className="zodiac-symbol zodiac-2">♉</div>
      <div className="zodiac-symbol zodiac-3">♊</div>
      <div className="zodiac-symbol zodiac-4">♋</div>
      <div className="zodiac-symbol zodiac-5">♌</div>
      <div className="zodiac-symbol zodiac-6">♍</div>
      <div className="zodiac-symbol zodiac-7">♎</div>
      <div className="zodiac-symbol zodiac-8">♏</div>
      <div className="zodiac-symbol zodiac-9">♐</div>
      <div className="zodiac-symbol zodiac-10">♑</div>
      <div className="zodiac-symbol zodiac-11">♒</div>
      <div className="zodiac-symbol zodiac-12">♓</div>

      {/* Stars - Reduced to 10 for better performance */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        ></div>
      ))}
    </div>
  );
};

export default PlanetaryAnimation;

