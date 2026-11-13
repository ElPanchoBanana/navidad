import { useEffect, useState } from 'react';

const giftEmojis = ['🎁', '🎀', '⚡', '🍥', '✨', '🎂', '🎊', '🎉', '🌀', '🦊'];

const FallingGiftsEffect = () => {
  const [items, setItems] = useState<Array<{ id: number; left: string; animationDuration: string; animationDelay: string; fontSize: string; emoji: string }>>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 10 + 8}s`,
      animationDelay: `${Math.random() * 5}s`,
      fontSize: `${Math.random() * 12 + 14}px`,
      emoji: giftEmojis[Math.floor(Math.random() * giftEmojis.length)],
    }));
    setItems(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className="falling-gift"
          style={{
            left: item.left,
            animationDuration: item.animationDuration,
            animationDelay: item.animationDelay,
            fontSize: item.fontSize,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
};

export default FallingGiftsEffect;
