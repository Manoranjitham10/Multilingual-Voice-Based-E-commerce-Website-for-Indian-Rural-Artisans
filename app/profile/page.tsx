'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  name: string;
  mobile: string;
  language: string;
  location: string;
  craft: string;
  isLoggedIn: boolean;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    craft: '',
    language: 'en'
  });
  const [isListening, setIsListening] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const router = useRouter();

  const translations = {
    en: {
      title: 'Profile',
      backToDashboard: 'Back to Dashboard',
      editProfile: 'Edit Profile',
      saveProfile: 'Save Profile',
      cancelEdit: 'Cancel',
      name: 'Full Name',
      mobile: 'Mobile Number',
      location: 'Location/Village',
      craft: 'Your Craft/Skill',
      language: 'Preferred Language',
      memberSince: 'Member Since',
      accountDetails: 'Account Details',
      voiceInput: 'Voice Input',
      listening: 'Listening...',
      startVoiceInput: 'Start Voice Input',
      profileUpdated: 'Profile updated successfully!',
      namePlaceholder: 'Enter your full name',
      locationPlaceholder: 'Enter your village/city',
      craftPlaceholder: 'e.g., Pottery, Weaving, Handicrafts'
    },
    hi: {
      title: 'प्रोफाइल',
      backToDashboard: 'डैशबोर्ड पर वापस जाएं',
      editProfile: 'प्रोफाइल संपादित करें',
      saveProfile: 'प्रोफाइल सेव करें',
      cancelEdit: 'रद्द करें',
      name: 'पूरा नाम',
      mobile: 'मोबाइल नंबर',
      location: 'स्थान/गाँव',
      craft: 'आपका शिल्प/कौशल',
      language: 'पसंदीदा भाषा',
      memberSince: 'सदस्य बने',
      accountDetails: 'खाता विवरण',
      voiceInput: 'आवाज़ इनपुट',
      listening: 'सुन रहा है...',
      startVoiceInput: 'आवाज़ इनपुट शुरू करें',
      profileUpdated: 'प्रोफाइल सफलतापूर्वक अपडेट हो गया!',
      namePlaceholder: 'अपना पूरा नाम डालें',
      locationPlaceholder: 'अपना गाँव/शहर डालें',
      craftPlaceholder: 'जैसे: मिट्टी का काम, बुनाई, हस्तशिल्प'
    },
    ta: {
      title: 'சுயவிவரம்',
      backToDashboard: 'டாஷ்போர்டுக்குத் திரும்பு',
      editProfile: 'சுயவிவரத்தைத் திருத்து',
      saveProfile: 'சுயவிவரத்தைச் சேமி',
      cancelEdit: 'ரத்துசெய்',
      name: 'முழு பெயர்',
      mobile: 'மொபைல் எண்',
      location: 'இடம்/கிராமம்',
      craft: 'உங்கள் கைவினை/திறமை',
      language: 'விருப்பமான மொழி',
      memberSince: 'உறுப்பினராக',
      accountDetails: 'கணக்கு விவரங்கள்',
      voiceInput: 'குரல் உள்ளீடு',
      listening: 'கேட்கிறது...',
      startVoiceInput: 'குரல் உள்ளீடு தொடங்கு',
      profileUpdated: 'சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!',
      namePlaceholder: 'உங்கள் முழு பெயரை உள்ளிடவும்',
      locationPlaceholder: 'உங்கள் கிராமம்/நகரத்தை உள்ளிடவும்',
      craftPlaceholder: 'எ.கா: மண்பாண்டம், நெசவு, கைவினை'
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user);
      setFormData({
        name: user.name || '',
        location: user.location || '',
        craft: user.craft || '',
        language: user.language || 'en'
      });
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const t = translations[user.language as keyof typeof translations];

  const handleVoiceInput = (field: string) => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = user.language === 'hi' ? 'hi-IN' : user.language === 'ta' ? 'ta-IN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setCurrentField(field);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setFormData(prev => ({
          ...prev,
          [field]: transcript
        }));
        
        // Stop listening immediately to prevent feedback loop
        recognition.stop();
      };

      recognition.onerror = () => {
        setIsListening(false);
        setCurrentField('');
      };

      recognition.onend = () => {
        setIsListening(false);
        setCurrentField('');
      };

      recognition.start();
    }
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    alert(t.profileUpdated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
              ← {t.backToDashboard}
            </Link>
            <h1 className="text-2xl font-bold text-orange-600" style={{ fontFamily: 'Pacifico' }}>
              {t.title}
            </h1>
            <div></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{t.accountDetails}</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium whitespace-nowrap"
              >
                {t.editProfile}
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
                >
                  {t.saveProfile}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium whitespace-nowrap"
                >
                  {t.cancelEdit}
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.name}
                </label>
                {isEditing ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder={t.namePlaceholder}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <button
                      onClick={() => handleVoiceInput('name')}
                      disabled={isListening && currentField === 'name'}
                      className={`px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                        isListening && currentField === 'name'
                          ? 'bg-red-600 text-white'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <i className="ri-mic-line w-5 h-5 flex items-center justify-center"></i>
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-900 text-lg">{user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.mobile}
                </label>
                <p className="text-gray-900 text-lg">{user.mobile}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.location}
                </label>
                {isEditing ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder={t.locationPlaceholder}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <button
                      onClick={() => handleVoiceInput('location')}
                      disabled={isListening && currentField === 'location'}
                      className={`px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                        isListening && currentField === 'location'
                          ? 'bg-red-600 text-white'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <i className="ri-mic-line w-5 h-5 flex items-center justify-center"></i>
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-900 text-lg">{user.location}</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.craft}
                </label>
                {isEditing ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={formData.craft}
                      onChange={(e) => setFormData({...formData, craft: e.target.value})}
                      placeholder={t.craftPlaceholder}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <button
                      onClick={() => handleVoiceInput('craft')}
                      disabled={isListening && currentField === 'craft'}
                      className={`px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                        isListening && currentField === 'craft'
                          ? 'bg-red-600 text-white'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <i className="ri-mic-line w-5 h-5 flex items-center justify-center"></i>
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-900 text-lg">{user.craft}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.language}
                </label>
                {isEditing ? (
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-8"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="ta">தமிழ்</option>
                  </select>
                ) : (
                  <p className="text-gray-900 text-lg">
                    {user.language === 'hi' ? 'हिंदी' : user.language === 'ta' ? 'தமிழ்' : 'English'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.memberSince}
                </label>
                <p className="text-gray-900 text-lg">December 2024</p>
              </div>
            </div>
          </div>

          {isListening && (
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-center space-x-2">
                <i className="ri-mic-line text-blue-600 w-5 h-5 flex items-center justify-center animate-pulse"></i>
                <p className="text-blue-700 font-medium">
                  {t.listening} - {currentField}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
