
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

export default function AddProductPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingGuidance, setIsPlayingGuidance] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [currentVoiceField, setCurrentVoiceField] = useState<'name' | 'price' | 'description' | null>(null);
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null as File | null
  });
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const translations = {
    en: {
      title: 'Add New Product',
      backToDashboard: 'Back to Dashboard',
      voiceInput: 'Voice Input',
      manualInput: 'Manual Input',
      startVoiceInput: 'Start Voice Input',
      stopVoiceInput: 'Stop Voice Input',
      listening: 'Listening...',
      productName: 'Product Name',
      price: 'Price (₹)',
      description: 'Description',
      category: 'Category',
      uploadImage: 'Upload Image',
      confirmProduct: 'Confirm Product',
      addProduct: 'Add Product',
      voiceInstructions: 'Say: "Blue clay pot for 150 rupees"',
      namePlaceholder: 'Enter product name',
      pricePlaceholder: 'Enter price in rupees',
      descriptionPlaceholder: 'Describe your product...',
      categoryPlaceholder: 'Select category',
      categories: {
        pottery: 'Pottery',
        textiles: 'Textiles & Weaving',
        woodwork: 'Woodwork',
        metalwork: 'Metalwork',
        jewelry: 'Jewelry',
        others: 'Others'
      },
      productAdded: 'Product added successfully!',
      fillRequired: 'Please fill all required fields',
      voiceProcessing: 'Processing voice input...',
      loading: 'Loading...'
    },
    hi: {
      title: 'नया उत्पाद जोड़ें',
      backToDashboard: 'डैशबोर्ड पर वापस जाएं',
      voiceInput: 'आवाज़ इनपुट',
      manualInput: 'मैन्युअल इनपुट',
      startVoiceInput: 'आवाज़ इनपुट शुरू करें',
      stopVoiceInput: 'आवाज़ इनपुट बंद करें',
      listening: 'सुन रहा है...',
      productName: 'उत्पाद का नाम',
      price: 'कीमत (₹)',
      description: 'विवरण',
      category: 'श्रेणी',
      uploadImage: 'तस्वीर अपलोड करें',
      confirmProduct: 'उत्पाद की पुष्टि करें',
      addProduct: 'उत्पाद जोड़ें',
      voiceInstructions: 'कहें: "नीला मिट्टी का घड़ा 150 रुपये में"',
      namePlaceholder: 'उत्पाद का नाम डालें',
      pricePlaceholder: 'कीमत रुपये में डालें',
      descriptionPlaceholder: 'अपने उत्पाद का विवरण दें...',
      categoryPlaceholder: 'श्रेणी चुनें',
      categories: {
        pottery: 'मिट्टी का काम',
        textiles: 'कपड़ा और बुनाई',
        woodwork: 'लकड़ी का काम',
        metalwork: 'धातु का काम',
        jewelry: 'आभूषण',
        others: 'अन्य'
      },
      productAdded: 'उत्पाद सफलतापूर्वक जोड़ा गया!',
      fillRequired: 'कृपया सभी आवश्यक फील्ड भरें',
      voiceProcessing: 'आवाज़ इनपुट प्रोसेसिंग...',
      loading: 'लोड हो रहा है...'
    },
    ta: {
      title: 'புதிய தயாரிப்பு சேர்',
      backToDashboard: 'டாஷ்போர்டுக்குத் திரும்பு',
      voiceInput: 'குரல் உள்ளீடு',
      manualInput: 'கைமுறை உள்ளீடு',
      startVoiceInput: 'குரல் உள்ளீடு தொடங்கு',
      stopVoiceInput: 'குரல் உள்ளீடு நிறுத்து',
      listening: 'கேட்கிறது...',
      productName: 'தயாரிப்பு பெயர்',
      price: 'விலை (₹)',
      description: 'விவரம்',
      category: 'வகை',
      uploadImage: 'படம் பதிவேற்று',
      confirmProduct: 'தயாரிப்பு உறுதிப்படுத்து',
      addProduct: 'தயாரிப்பு சேர்',
      voiceInstructions: 'சொல்லுங்கள்: "நீல மண் பானை 150 ரூபாய்"',
      namePlaceholder: 'தயாரிப்பு பெயரை உள்ளிடவும்',
      pricePlaceholder: 'விலையை ரூபாயில் உள்ளிடவும்',
      descriptionPlaceholder: 'உங்கள் தயாரிப்பின் விவரம்...',
      categoryPlaceholder: 'வகையைத் தேர்ந்தெடுக்கவும்',
      categories: {
        pottery: 'மண்பாண்டம்',
        textiles: 'ஜவுளி & நெசவு',
        woodwork: 'மரவேலை',
        metalwork: 'உலோக வேலை',
        jewelry: 'நகைகள்',
        others: 'மற்றவை'
      },
      productAdded: 'தயாரிப்பு வெற்றிகரமாக சேர்க்கப்பட்டது!',
      fillRequired: 'தேவையான அனைத்து புலங்களையும் நிரப்பவும்',
      voiceProcessing: 'குரல் உள்ளீட்டை செயலாக்குகிறது...',
      loading: 'ஏற்றுகிறது...'
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const t = translations[user.language as keyof typeof translations];

  const handleVoiceInput = (field: 'name' | 'price' | 'description') => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const newRecognition = new SpeechRecognition();
      
      newRecognition.lang = user.language === 'hi' ? 'hi-IN' : user.language === 'ta' ? 'ta-IN' : 'en-US';
      newRecognition.continuous = false;
      newRecognition.interimResults = false;

      newRecognition.onstart = () => {
        setIsListening(true);
        setIsRecording(true);
        setCurrentVoiceField(field);
      };

      newRecognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        
        // Stop listening immediately to prevent feedback loop
        newRecognition.stop();
        
        // Process the input after a short delay
        setTimeout(() => {
          processVoiceInput(transcript, field);
        }, 500);
      };

      newRecognition.onerror = () => {
        setIsListening(false);
        setIsRecording(false);
        setCurrentVoiceField(null);
      };

      newRecognition.onend = () => {
        setIsListening(false);
        setIsRecording(false);
        setCurrentVoiceField(null);
      };

      setRecognition(newRecognition);
      
      // Play guidance first, then start recognition
      if ('speechSynthesis' in window) {
        setIsPlayingGuidance(true);
        
        let guidanceText = '';
        if (field === 'name') {
          guidanceText = user.language === 'hi' ? 
            'अपने उत्पाद का नाम बताएं। जैसे: नीला मिट्टी का घड़ा' :
            user.language === 'ta' ? 
            'உங்கள் தயாரிப்பின் பெயரைக் கூறுங்கள். எடுத்துக்காட்டு: நீல மண் பானை' :
            'Please say your product name. For example: Blue clay pot';
        } else if (field === 'price') {
          guidanceText = user.language === 'hi' ? 
            'अपने उत्पाद की कीमत बताएं। सिर्फ नंबर बोलें, जैसे: 150' :
            user.language === 'ta' ? 
            'உங்கள் தயாரிப்பின் விலையைக் கூறுங்கள். எண்ணை மட்டும் கூறுங்கள், எடுத்துக்காட்டு: 150' :
            'Please say your product price. Just say the number, for example: 150';
        } else if (field === 'description') {
          guidanceText = user.language === 'hi' ? 
            'अपने उत्पाद का विवरण बताएं। जैसे: यह एक सुंदर हस्तनिर्मित मिट्टी का घड़ा है' :
            user.language === 'ta' ? 
            'உங்கள் தயாரிப்பின் விவரத்தைக் கூறுங்கள். எடுத்துக்காட்டு: இது ஒரு அழகான கைவினை மண் பானை' :
            'Please describe your product. For example: This is a beautiful handmade clay pot';
        }
        
        const utterance = new SpeechSynthesisUtterance(guidanceText);
        utterance.lang = user.language === 'hi' ? 'hi-IN' : user.language === 'ta' ? 'ta-IN' : 'en-US';
        utterance.rate = 0.8; // Slower speech for better understanding
        
        // Start recognition after guidance finishes
        utterance.onend = () => {
          setIsPlayingGuidance(false);
          setTimeout(() => {
            newRecognition.start();
          }, 1000); // Wait 1 second after guidance ends
        };
        
        speechSynthesis.speak(utterance);
      } else {
        // If no speech synthesis, start recognition immediately
        newRecognition.start();
      }
    }
  };

  const stopVoiceInput = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      setIsRecording(false);
    }
  };

  const processVoiceInput = (input: string, field: 'name' | 'price' | 'description') => {
    // Clean up the input
    let cleanedInput = input.trim();
    
    // Special processing for price field
    if (field === 'price') {
      // Extract only numeric values from price input
      const priceMatch = cleanedInput.match(/(\d+)/);
      if (priceMatch) {
        cleanedInput = priceMatch[1]; // Only the numeric part
      } else {
        cleanedInput = ''; // If no number found, set empty
      }
    }
    
    // Set the data based on the field
    setProductData(prev => ({
      ...prev,
      [field]: cleanedInput
    }));
    
    // Voice feedback and auto-prompt for next field
    setTimeout(() => {
      if ('speechSynthesis' in window) {
        let feedbackText = '';
        let nextPromptText = '';
        
        if (field === 'name') {
          feedbackText = user.language === 'hi' ? 
            `उत्पाद का नाम: ${cleanedInput}` :
            user.language === 'ta' ? 
            `தயாரிப்பு பெயர்: ${cleanedInput}` :
            `Product name: ${cleanedInput}`;
            
          nextPromptText = user.language === 'hi' ? 
            'अब अपने उत्पाद की कीमत बताएं। सिर्फ नंबर बोलें, जैसे: 150' :
            user.language === 'ta' ? 
            'இப்போது உங்கள் தயாரிப்பின் விலையைக் கூறுங்கள். எண்ணை மட்டும் கூறுங்கள், எடுத்துக்காட்டு: 150' :
            'Now please say your product price. Just say the number, for example: 150';
            
        } else if (field === 'price') {
          feedbackText = user.language === 'hi' ? 
            `कीमत: ₹${cleanedInput} रुपये` :
            user.language === 'ta' ? 
            `விலை: ₹${cleanedInput} ரூபாய்` :
            `Price: ₹${cleanedInput} rupees`;
            
          nextPromptText = user.language === 'hi' ? 
            'अब अपने उत्पाद का विवरण बताएं। जैसे: यह एक सुंदर हस्तनिर्मित मिट्टी का घड़ा है' :
            user.language === 'ta' ? 
            'இப்போது உங்கள் தயாரிப்பின் விவரத்தைக் கூறுங்கள். எடுத்துக்காட்டு: இது ஒரு அழகான கைவினை மண் பானை' :
            'Now please describe your product. For example: This is a beautiful handmade clay pot';
            
        } else if (field === 'description') {
          feedbackText = user.language === 'hi' ? 
            `विवरण: ${cleanedInput}` :
            user.language === 'ta' ? 
            `விவரம்: ${cleanedInput}` :
            `Description: ${cleanedInput}`;
            
          nextPromptText = user.language === 'hi' ? 
            'सभी जानकारी पूरी हो गई है। आप अब उत्पाद जोड़ सकते हैं।' :
            user.language === 'ta' ? 
            'அனைத்து தகவல்களும் முடிந்துவிட்டன. நீங்கள் இப்போது தயாரிப்பைச் சேர்க்கலாம்.' :
            'All information is complete. You can now add the product.';
        }
        
        // Speak feedback first
        const feedbackUtterance = new SpeechSynthesisUtterance(feedbackText);
        feedbackUtterance.lang = user.language === 'hi' ? 'hi-IN' : user.language === 'ta' ? 'ta-IN' : 'en-US';
        
        // Speak next prompt after feedback
        feedbackUtterance.onend = () => {
          setTimeout(() => {
            const promptUtterance = new SpeechSynthesisUtterance(nextPromptText);
            promptUtterance.lang = user.language === 'hi' ? 'hi-IN' : user.language === 'ta' ? 'ta-IN' : 'en-US';
            promptUtterance.rate = 0.8;
            speechSynthesis.speak(promptUtterance);
            
            // Don't auto-start next field to prevent audio duplication
            // User can manually click the next voice input button
          }, 1000); // Wait 1 second after feedback
        };
        
        speechSynthesis.speak(feedbackUtterance);
      }
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductData(prev => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!productData.name || !productData.price) {
        alert(t.fillRequired);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store product data (in real app, this would be sent to backend)
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      products.push({
        id: Date.now(),
        ...productData,
        userId: user.mobile,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('products', JSON.stringify(products));

      alert(t.productAdded);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsLoading(false);
    }
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t.voiceInput}</h2>
            <div className="space-y-4">
              {isPlayingGuidance ? (
                <button
                  disabled
                  className="w-full py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-3 transition-colors whitespace-nowrap bg-yellow-600 text-white opacity-75 cursor-not-allowed"
                >
                  <i className="ri-volume-up-line w-6 h-6 flex items-center justify-center"></i>
                  Playing Guidance...
                </button>
              ) : !isListening ? (
                <div className="space-y-3">
                  <button
                    onClick={() => handleVoiceInput('name')}
                    className="w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-3 transition-colors whitespace-nowrap bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <i className="ri-mic-line w-5 h-5 flex items-center justify-center"></i>
                    {user.language === 'hi' ? 'आवाज़ इनपुट - उत्पाद का नाम' : 
                     user.language === 'ta' ? 'குரல் உள்ளீடு - தயாரிப்பு பெயர்' : 
                     'Voice Input - Product Name'}
                  </button>
                  <button
                    onClick={() => handleVoiceInput('price')}
                    className="w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-3 transition-colors whitespace-nowrap bg-green-600 text-white hover:bg-green-700"
                  >
                    <i className="ri-mic-line w-5 h-5 flex items-center justify-center"></i>
                    {user.language === 'hi' ? 'आवाज़ इनपुट - कीमत' : 
                     user.language === 'ta' ? 'குரல் உள்ளீடு - விலை' : 
                     'Voice Input - Price'}
                  </button>
                  <button
                    onClick={() => handleVoiceInput('description')}
                    className="w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-3 transition-colors whitespace-nowrap bg-purple-600 text-white hover:bg-purple-700"
                  >
                    <i className="ri-mic-line w-5 h-5 flex items-center justify-center"></i>
                    {user.language === 'hi' ? 'आवाज़ इनपुट - विवरण' : 
                     user.language === 'ta' ? 'குரல் உள்ளீடு - விவரம்' : 
                     'Voice Input - Description'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={stopVoiceInput}
                  className="w-full py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-3 transition-colors whitespace-nowrap bg-red-600 text-white hover:bg-red-700"
                >
                  <i className="ri-stop-circle-line w-6 h-6 flex items-center justify-center"></i>
                  {t.stopVoiceInput}
                </button>
              )}
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700 font-medium mb-2">Voice Instructions:</p>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• <strong>Product Name:</strong> "Blue clay pot" or "नीला मिट्टी का घड़ा"</li>
                  <li>• <strong>Price:</strong> "150" or "200" (just the number, no ₹ symbol)</li>
                  <li>• <strong>Description:</strong> "Beautiful handmade clay pot" or "सुंदर हस्तनिर्मित मिट्टी का घड़ा"</li>
                  <li>• <strong>Note:</strong> For price, say only the number (e.g., "150", not "₹150" or "150 rupees")</li>
                </ul>
                <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-xs text-yellow-700">
                    💡 <strong>Tip:</strong> Click the appropriate button for each field you want to fill
                  </p>
                </div>
              </div>
              
              {/* Progress Indicator */}
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700 font-medium mb-3">
                  {user.language === 'hi' ? 'प्रगति:' :
                   user.language === 'ta' ? 'முன்னேற்றம்:' :
                   'Progress:'}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      productData.name ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {productData.name ? '✓' : '1'}
                    </div>
                    <span className={`text-sm ${productData.name ? 'text-green-700' : 'text-gray-600'}`}>
                      {user.language === 'hi' ? 'उत्पाद का नाम' :
                       user.language === 'ta' ? 'தயாரிப்பு பெயர்' :
                       'Product Name'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      productData.price ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {productData.price ? '✓' : '2'}
                    </div>
                    <span className={`text-sm ${productData.price ? 'text-green-700' : 'text-gray-600'}`}>
                      {user.language === 'hi' ? 'कीमत' :
                       user.language === 'ta' ? 'விலை' :
                       'Price'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      productData.description ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {productData.description ? '✓' : '3'}
                    </div>
                    <span className={`text-sm ${productData.description ? 'text-green-700' : 'text-gray-600'}`}>
                      {user.language === 'hi' ? 'विवरण' :
                       user.language === 'ta' ? 'விவரம்' :
                       'Description'}
                    </span>
                  </div>
                </div>
                {productData.name && productData.price && productData.description && (
                  <div className="mt-3 p-2 bg-green-100 border border-green-200 rounded">
                    <p className="text-xs text-green-700 font-medium">
                      {user.language === 'hi' ? '🎉 सभी जानकारी पूरी हो गई है!' :
                       user.language === 'ta' ? '🎉 அனைத்து தகவல்களும் முடிந்துவிட்டன!' :
                       '🎉 All information is complete!'}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Status Indicator */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700 font-medium mb-1">Status:</p>
                <div className="flex items-center space-x-2">
                  {isPlayingGuidance ? (
                    <>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-yellow-700">
                        {user.language === 'hi' ? 
                          `${currentVoiceField === 'name' ? 'उत्पाद का नाम' : currentVoiceField === 'price' ? 'कीमत' : 'विवरण'} के लिए आवाज़ मार्गदर्शन चल रहा है...` :
                         user.language === 'ta' ? 
                          `${currentVoiceField === 'name' ? 'தயாரிப்பு பெயர்' : currentVoiceField === 'price' ? 'விலை' : 'விவரம்'}க்கான குரல் வழிகாட்டுதல் இயங்குகிறது...` :
                          `Playing voice guidance for ${currentVoiceField}...`}
                      </span>
                    </>
                  ) : isListening ? (
                    <>
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-red-700">
                        {user.language === 'hi' ? 
                          `${currentVoiceField === 'name' ? 'उत्पाद का नाम' : currentVoiceField === 'price' ? 'कीमत' : 'विवरण'} सुन रहा है...` :
                         user.language === 'ta' ? 
                          `${currentVoiceField === 'name' ? 'தயாரிப்பு பெயர்' : currentVoiceField === 'price' ? 'விலை' : 'விவரம்'} கேட்கிறது...` :
                          `Listening for ${currentVoiceField}...`}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        {user.language === 'hi' ? 'आवाज़ इनपुट शुरू करने के लिए तैयार' :
                         user.language === 'ta' ? 'குரல் உள்ளீட்டைத் தொடங்க தயாராக உள்ளது' :
                         'Ready to start voice input'}
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              {transcript && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm text-gray-700 font-medium">
                      {user.language === 'hi' ? 'आवाज़ इनपुट:' :
                       user.language === 'ta' ? 'குரல் உள்ளீடு:' :
                       'Voice Input:'}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleVoiceInput(currentVoiceField || 'name')}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        {user.language === 'hi' ? 'फिर से कोशिश करें' : 
                         user.language === 'ta' ? 'மீண்டும் முயற்சிக்கவும்' : 
                         'Try Again'}
                      </button>
                      <button
                        onClick={() => setTranscript('')}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        {user.language === 'hi' ? 'साफ़ करें' : 
                         user.language === 'ta' ? 'அழிக்கவும்' : 
                         'Clear'}
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-900 mb-3">{transcript}</p>
                  
                  {/* Show extracted data */}
                  <div className="bg-white p-3 rounded border">
                    <p className="text-xs text-gray-600 mb-2">
                      {user.language === 'hi' ? 'वर्तमान डेटा:' :
                       user.language === 'ta' ? 'தற்போதைய தரவு:' :
                       'Current Data:'}
                    </p>
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="font-medium">
                          {user.language === 'hi' ? 'नाम:' :
                           user.language === 'ta' ? 'பெயர்:' :
                           'Name:'}
                        </span> {productData.name || (user.language === 'hi' ? 'सेट नहीं' : user.language === 'ta' ? 'அமைக்கப்படவில்லை' : 'Not set')}
                      </div>
                      <div>
                        <span className="font-medium">
                          {user.language === 'hi' ? 'कीमत:' :
                           user.language === 'ta' ? 'விலை:' :
                           'Price:'}
                        </span> {productData.price ? `₹${productData.price}` : (user.language === 'hi' ? 'सेट नहीं' : user.language === 'ta' ? 'அமைக்கப்படவில்லை' : 'Not set')}
                      </div>
                      <div>
                        <span className="font-medium">
                          {user.language === 'hi' ? 'विवरण:' :
                           user.language === 'ta' ? 'விவரம்:' :
                           'Description:'}
                        </span> {productData.description || (user.language === 'hi' ? 'सेट नहीं' : user.language === 'ta' ? 'அமைக்கப்படவில்லை' : 'Not set')}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t.manualInput}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.productName}
                </label>
                <input
                  type="text"
                  value={productData.name}
                  onChange={(e) => setProductData(prev => ({...prev, name: e.target.value}))}
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.price}
                </label>
                <input
                  type="number"
                  value={productData.price}
                  onChange={(e) => setProductData(prev => ({...prev, price: e.target.value}))}
                  placeholder={t.pricePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.category}
                </label>
                <select
                  value={productData.category}
                  onChange={(e) => setProductData(prev => ({...prev, category: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-8"
                  required
                >
                  <option value="">{t.categoryPlaceholder}</option>
                  {Object.entries(t.categories).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.description}
                </label>
                <textarea
                  value={productData.description}
                  onChange={(e) => setProductData(prev => ({...prev, description: e.target.value}))}
                  placeholder={t.descriptionPlaceholder}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  maxLength={500}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.uploadImage}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium whitespace-nowrap"
              >
                {isLoading ? '...' : t.addProduct}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
