import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const FlamesCalculator = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateFlames = () => {
    if (!name1.trim() || !name2.trim()) {
      alert('Please enter both names');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Remove spaces and convert to lowercase
      const cleanName1 = name1.replace(/\s/g, '').toLowerCase();
      const cleanName2 = name2.replace(/\s/g, '').toLowerCase();

      // Count common letters
      let common = 0;
      const letters1 = cleanName1.split('');
      const letters2 = cleanName2.split('');

      for (let letter of letters1) {
        if (letters2.includes(letter)) {
          common++;
          letters2.splice(letters2.indexOf(letter), 1);
        }
      }

      // Remaining letters
      const remaining = (cleanName1.length - common) + (cleanName2.length - common);

      // FLAMES = F(1), L(2), A(3), M(4), E(5), S(6)
      const flames = ['🔥 Friends', '💚 Love', '😇 Affection', '💍 Marriage', '😢 Enemy', '💔 Sister'];
      let flamesArray = [...flames];
      let count = remaining % 6 === 0 ? 6 : remaining % 6;

      // Eliminate letters one by one
      let current = 0;
      while (flamesArray.length > 1) {
        current = (current + count - 1) % flamesArray.length;
        flamesArray.splice(current, 1);
        if (flamesArray.length > 1) {
          current = current % flamesArray.length;
        }
      }

      const relationshipType = flamesArray[0];
      const meaning = {
        '🔥 Friends': 'You two are great friends! There\'s a strong platonic bond and excellent compatibility.',
        '💚 Love': 'There\'s romantic love between you two! A beautiful relationship is indicated.',
        '😇 Affection': 'You have deep affection and care for each other. A wonderful emotional connection.',
        '💍 Marriage': 'Marriage is indicated! Strong long-term compatibility and family life together.',
        '😢 Enemy': 'Currently conflicting energies. With understanding and effort, you can overcome differences.',
        '💔 Sister': 'You share a sibling-like bond. Great for friendship and mutual support.'
      };

      setResult({
        name1,
        name2,
        commonLetters: common,
        remainingLetters: remaining,
        relationshipType,
        meaning: meaning[relationshipType]
      });

      setLoading(false);
    }, 500);
  };

  const reset = () => {
    setName1('');
    setName2('');
    setPhone('');
    setEmail('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="FLAMES Calculator - Happy Kismat"
        description="Use our free FLAMES calculator to discover the nature of your relationship. Find out if it's Friends, Love, Affection, Marriage, Enemy, or Sister!"
      />

      {/* Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/calculators" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Calculators
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">🔥 FLAMES Calculator</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the nature of your relationship using the FLAMES method. Enter two names to reveal the connection!
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Input Card */}
            <Card className="p-8 border-2 border-purple-100 bg-gradient-to-br from-white to-purple-50">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">Enter Details</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    placeholder="Enter first name"
                    onKeyPress={(e) => e.key === 'Enter' && calculateFlames()}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Second Name *</label>
                  <input
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="Enter second name"
                    onKeyPress={(e) => e.key === 'Enter' && calculateFlames()}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={calculateFlames}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 text-lg font-semibold disabled:opacity-50"
                  >
                    {loading ? 'Calculating...' : 'Calculate FLAMES'}
                  </Button>

                  {result && (
                    <Button
                      onClick={reset}
                      variant="outline"
                      className="w-full border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Result Card */}
            {result && (
              <Card className="p-8 border-2 border-amber-100 bg-gradient-to-br from-amber-50 to-purple-50 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-purple-900 mb-6">Result</h2>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Relationship Type</p>
                    <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 my-2">
                      {result.relationshipType}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
                    <p className="text-gray-700 leading-relaxed italic">
                      "{result.meaning}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <p className="text-xs text-gray-500 uppercase">Common Letters</p>
                      <p className="text-2xl font-bold text-purple-600">{result.commonLetters}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <p className="text-xs text-gray-500 uppercase">Remaining Letters</p>
                      <p className="text-2xl font-bold text-amber-600">{result.remainingLetters}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* What is FLAMES */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">What is the FLAMES Calculator?</h2>

          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-red-500">
              <p className="text-gray-700 leading-relaxed">
                The FLAMES Calculator is a fun and popular relationship prediction game that has entertained people for decades. It uses a simple name-based algorithm to determine the nature of a relationship between two people. FLAMES is an acronym that stands for: <strong>Friends, Love, Affection, Marriage, Enemy, and Sister</strong>.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-orange-500">
              <h3 className="font-bold text-purple-900 mb-3">History of FLAMES</h3>
              <p className="text-gray-700">
                FLAMES originated in the early 1900s and became extremely popular in schools and social circles. It's a simple counting game based on eliminating letters, and while purely entertainment-based, it's loved for its simplicity and the element of fun it brings to determining relationship compatibility.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-blue-500">
              <h3 className="font-bold text-purple-900 mb-3">Understanding the Results</h3>
              <div className="space-y-3 text-gray-700">
                <p>Each outcome represents a different type of relationship:</p>
                <ul className="space-y-2 ml-4">
                  <li><strong>🔥 Friends:</strong> Strong platonic bond and great friendship potential</li>
                  <li><strong>💚 Love:</strong> Romantic compatibility and mutual attraction</li>
                  <li><strong>😇 Affection:</strong> Deep emotional care and tenderness</li>
                  <li><strong>💍 Marriage:</strong> Long-term compatibility and family life potential</li>
                  <li><strong>😢 Enemy:</strong> Conflicting energies requiring understanding</li>
                  <li><strong>💔 Sister:</strong> Sibling-like bond and mutual support</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">How Does the FLAMES Calculator Work?</h2>

          <div className="space-y-4 mb-8">
            {[
              { step: 1, title: 'Enter Names', desc: 'Type in the two names you want to check.' },
              { step: 2, title: 'Find Common Letters', desc: 'The calculator identifies common letters between both names and eliminates them.' },
              { step: 3, title: 'Count Remaining', desc: 'It counts the remaining letters after removing all common ones.' },
              { step: 4, title: 'Apply FLAMES Algorithm', desc: 'Uses the remaining count to eliminate FLAMES letters (F-L-A-M-E-S) one by one.' },
              { step: 5, title: 'Get Result', desc: 'The final remaining letter reveals your relationship nature!' }
            ].map((item) => (
              <Card key={item.step} className="p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900">{item.title}</h3>
                    <p className="text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-orange-200">
            <h3 className="font-bold text-purple-900 mb-3">Example Calculation</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Names:</strong> "SARA" and "JOHN"</p>
              <p><strong>Common letters:</strong> A (2 common letters)</p>
              <p><strong>Remaining:</strong> S, R from Sara + J, O, H, N from John = 6 letters</p>
              <p><strong>FLAMES elimination:</strong> 6 % 6 = 0, so the cycle completes</p>
              <p><strong>Result:</strong> The last remaining FLAMES letter is determined</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Detailed Relationship Profiles */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Detailed Relationship Profiles</h2>

          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300">
              <h3 className="text-xl font-bold text-red-700 mb-3">🔥 Friends</h3>
              <p className="text-gray-700 mb-3">You two share a strong platonic bond with excellent friendship compatibility. There's mutual respect, trust, and understanding.</p>
              <div className="bg-white p-4 rounded border-l-4 border-red-500">
                <p className="text-sm text-gray-600"><strong>Characteristics:</strong> Great listeners, share hobbies, offer support, enjoy each other's company, complementary personalities</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300">
              <h3 className="text-xl font-bold text-green-700 mb-3">💚 Love</h3>
              <p className="text-gray-700 mb-3">There's romantic attraction and love between you two. This indicates strong emotional and physical chemistry with deep connection potential.</p>
              <div className="bg-white p-4 rounded border-l-4 border-green-500">
                <p className="text-sm text-gray-600"><strong>Characteristics:</strong> Mutual attraction, emotional connection, shared values, physical chemistry, romantic potential</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300">
              <h3 className="text-xl font-bold text-blue-700 mb-3">😇 Affection</h3>
              <p className="text-gray-700 mb-3">You have deep affection and care for each other. There's tenderness, compassion, and emotional understanding without necessarily romantic involvement.</p>
              <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                <p className="text-sm text-gray-600"><strong>Characteristics:</strong> Caring, compassionate, supportive, gentle, emotionally attuned, nurturing bond</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300">
              <h3 className="text-xl font-bold text-purple-700 mb-3">💍 Marriage</h3>
              <p className="text-gray-700 mb-3">This indicates strong long-term compatibility and potential for marriage or committed partnership. There's stability, trust, and family-oriented connection.</p>
              <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                <p className="text-sm text-gray-600"><strong>Characteristics:</strong> Stability, commitment-ready, family values, long-term vision, mutual growth, partnership potential</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300">
              <h3 className="text-xl font-bold text-yellow-700 mb-3">😢 Enemy</h3>
              <p className="text-gray-700 mb-3">Currently, there are conflicting energies between you two. However, with understanding, communication, and effort, many differences can be resolved and overcome.</p>
              <div className="bg-white p-4 rounded border-l-4 border-yellow-500">
                <p className="text-sm text-gray-600"><strong>Characteristics:</strong> Different viewpoints, clashing values, communication challenges (but not permanent—growth is possible)</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-300">
              <h3 className="text-xl font-bold text-pink-700 mb-3">💔 Sister</h3>
              <p className="text-gray-700 mb-3">You share a sibling-like bond. This is excellent for deep friendship, mutual support, and platonic love—like brothers and sisters who truly care for each other.</p>
              <div className="bg-white p-4 rounded border-l-4 border-pink-500">
                <p className="text-sm text-gray-600"><strong>Characteristics:</strong> Close friendship, familial love, protective of each other, strong bond, unconditional support</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="p-6 bg-amber-50 border-2 border-amber-200">
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>Note:</strong> The FLAMES calculator is a fun and entertainment-based tool. While it's enjoyed by many for its simplicity and playful nature, it should not be considered as a definitive measure of relationship compatibility. For serious relationship guidance, consider consulting with an astrologer for a detailed birth chart analysis.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FlamesCalculator;
