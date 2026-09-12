const SAMPLES: { id: string; text: string }[] = [
  { id: "01", text: "Our team has 40 employees entering the same customer details into three systems. Could you show us how this might be automated? We would like to speak next week." },
  { id: "02", text: "The client portal has been unavailable since this morning and our staff cannot access active customer records. Please help as soon as possible." },
  { id: "03", text: "Invoice NS-1048 appears to include the same implementation charge twice. Can someone review it before payment is processed Friday?" },
  { id: "04", text: "Can you add dark mode and change the dashboard font? There is no deadline. I am collecting ideas for a future update." },
  { id: "05", text: "We accidentally uploaded a spreadsheet containing customer contact information to the wrong workspace. We need immediate help removing access." },
  { id: "06", text: "I saw your company online and am interested in a custom AI reporting system. What would pricing and a typical timeline look like?" },
];

interface SampleRequestsProps {
  onSelect: (text: string) => void;
}

export default function SampleRequests({ onSelect }: Readonly<SampleRequestsProps>) {
  return (
    <div className="sample-chips">
      {SAMPLES.map((s) => (
        <button
          key={s.id}
          type="button"
          className="sample-chip"
          onClick={() => onSelect(s.text)}
          title={s.text}
        >
          {s.id}
        </button>
      ))}
    </div>
  );
}