interface ChatTextProps {
  message: string;
  sender: 'me' | 'other'; // Kim tomonidan yuborilganligini aniqlash
  time: string;
  isReceived: boolean;
}

export default function ChatText({ message, sender, time, isReceived }: ChatTextProps) {
  // `sender` qiymati bo'yicha joylashuv va ranglarni o'zgartirish
  const containerStyle =
    sender === 'me'
      ? 'ml-auto bg-green-500 text-white' // Mening xabarlarim yashil fonda, o'ngda
      : 'mr-auto bg-blue-500 text-white'; // Boshqalarning xabarlari ko'k fonda, chapda

  const alignmentStyle = sender === 'me' ? 'justify-end' : 'justify-start'; // Xabar joylashuvi

  return (
    <div className={`flex ${alignmentStyle} my-2`}>
      <div className={`p-2 max-w-xs ${containerStyle} rounded-md`}>
        <div className="text-sm">{message}</div>
        <div className="text-xs text-right mt-1">{time}</div>
      </div>
    </div>
  );
}
