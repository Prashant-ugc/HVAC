import React, { useState } from 'react';
import { TopUrgencyBar } from './components/TopUrgencyBar.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection, LeadData } from './components/HeroSection.tsx';
import { TroubleshooterSection } from './components/TroubleshooterSection.tsx';
import { FinancingCalculator } from './components/FinancingCalculator.tsx';
import { TrustGuaranteeBanner } from './components/TrustGuaranteeBanner.tsx';
import { VipClubSection } from './components/VipClubSection.tsx';
import { SocialProofSection } from './components/SocialProofSection.tsx';
import { Footer } from './components/Footer.tsx';
import { EmergencyChatWidget } from './components/EmergencyChatWidget.tsx';
import { BookingModal } from './components/BookingModal.tsx';
import { VipJoinModal } from './components/VipJoinModal.tsx';
import { FinancingEligibilityModal } from './components/FinancingEligibilityModal.tsx';
import { QuoteResult, SymptomDiagnosis } from './utils/hvacCalculations.ts';

export default function App() {
  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<QuoteResult | null>(null);
  const [selectedLead, setSelectedLead] = useState<LeadData | null>(null);
  const [selectedSymptomTitle, setSelectedSymptomTitle] = useState<string>('');

  const [isVipModalOpen, setIsVipModalOpen] = useState(false);

  const [isFinancingModalOpen, setIsFinancingModalOpen] = useState(false);
  const [financingData, setFinancingData] = useState({
    cost: 7500,
    term: 36,
    monthly: 208,
  });

  // Action handlers
  const handleOpenGeneralBooking = () => {
    setSelectedQuote(null);
    setSelectedLead(null);
    setSelectedSymptomTitle('');
    setIsBookingOpen(true);
  };

  const handleBookWithQuote = (quote: QuoteResult, lead: LeadData) => {
    setSelectedQuote(quote);
    setSelectedLead(lead);
    setSelectedSymptomTitle('');
    setIsBookingOpen(true);
  };

  const handleBookSymptom = (symptom: SymptomDiagnosis) => {
    setSelectedQuote(null);
    setSelectedLead(null);
    setSelectedSymptomTitle(symptom.title);
    setIsBookingOpen(true);
  };

  const handleCheckEligibility = (amount: number, term: number, monthly: number) => {
    setFinancingData({
      cost: amount,
      term,
      monthly,
    });
    setIsFinancingModalOpen(true);
  };

  const handleJoinVip = () => {
    setIsVipModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* 1. TOP LIVE URGENCY BAR */}
      <TopUrgencyBar onBookClick={handleOpenGeneralBooking} />

      {/* 2. STICKY NAVBAR */}
      <Navbar onBookClick={handleOpenGeneralBooking} />

      <main className="flex-1">
        {/* 3. HERO SECTION + 60-SEC QUOTE CALCULATOR */}
        <HeroSection
          onBookWithQuote={handleBookWithQuote}
          onOpenPhone={handleOpenGeneralBooking}
        />

        {/* 4. AC & HEATER SYMPTOM TROUBLESHOOTER */}
        <TroubleshooterSection onBookSymptom={handleBookSymptom} />

        {/* 5. BUY NOW, PAY MONTHLY FINANCING CALCULATOR */}
        <FinancingCalculator onCheckEligibility={handleCheckEligibility} />

        {/* 6. HOMEOWNER SAFETY & TRUST GUARANTEE (THE MOM TEST) */}
        <TrustGuaranteeBanner />

        {/* 7. VIP COMFORT CLUB MEMBERSHIP */}
        <VipClubSection onJoinVipClick={handleJoinVip} />

        {/* 8. SOCIAL PROOF & SEER2 BEFORE/AFTER SAVINGS SHOWCASE */}
        <SocialProofSection />
      </main>

      {/* 9. FOOTER */}
      <Footer />

      {/* 10. FLOATING 24/7 AI EMERGENCY DISPATCH CHAT WIDGET */}
      <EmergencyChatWidget />

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialQuote={selectedQuote}
        initialLead={selectedLead}
        initialSymptomTitle={selectedSymptomTitle}
      />

      <VipJoinModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
      />

      <FinancingEligibilityModal
        isOpen={isFinancingModalOpen}
        onClose={() => setIsFinancingModalOpen(false)}
        systemCost={financingData.cost}
        termMonths={financingData.term}
        monthlyPayment={financingData.monthly}
        onBookConsultation={() => {
          setIsFinancingModalOpen(false);
          handleOpenGeneralBooking();
        }}
      />
    </div>
  );
}
