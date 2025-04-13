"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const messages = [
    "Kamu hebat! 🌟",
    "Tetap semangat! 💪",
    "Kamu pasti bisa! 🚀",
    "Jangan menyerah! ✨",
    "Hari ini pasti sukses! 🌈",
    "Kegagalan itu cuma jalan memutar menuju sukses! 🔁",
    "Kamu bukan cuma cukup—kamu luar biasa! 💥",
    "Satu langkah kecil hari ini, bisa jadi lompatan besar esok hari 👣",
    "Hidupmu nggak harus sempurna, cukup penuh makna 🌻",
    "Breakdown hari ini bisa jadi breakthrough besok 🧠⚡",
    "Tuhan nggak pernah salah pilih pejuang 🤲",
    "Kerja kerasmu nggak sia-sia. Alam semesta mencatat 📜",
    "Kalau hari ini berat, mungkin kamu lagi naik level 🎮🔥",
    "Tenang, pelangi datang setelah badai 🌈⛈️",
    "Gas terus sampe impian nyerah! 💨💭",
  ];

  const teasingMessages = [
    "Peluk virtual? Realitanya kamu butuh tidur cukup 😴",
    "Kasih sayang AI? Segini doang yang bisa kuberi 🤖❤️",
    "Peluk virtual sih oke... tapi peluk tagihan kapan? 💸",
    "Nggak apa-apa kok, manusia kuat juga kadang butuh peluk. 💔",
    "Peluk ini tidak mengandung gluten, drama, atau mantan. 🤗",
    "Kamu baik-baik aja... kan? (AI worried noises) 🫣",
    "Jangan sedih, kamu masih punya... kode yang error 🧑‍💻🔥",
    "Ayo, peluk dulu biar semangat ngerjain bug! 🐞💥",
  ];

  const [currentMessage, setCurrentMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [teaseMessage, setTeaseMessage] = useState("");
  const [showTease, setShowTease] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const confettiRef = useRef<any>(null);

  useEffect(() => {
    audioRef.current = new Audio("/bad.mp3");
    audioRef.current.loop = true;

    import("canvas-confetti").then((mod) => {
      confettiRef.current = mod.default;
    });
  }, []);

  const playConfetti = () => {
    confettiRef.current?.({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      scalar: 1.2,
    });
  };

  const playSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch((err) => console.error("Audio error:", err));
    }
  };

  const handleClick = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    let i = 0;
    playSound();

    const interval = setInterval(() => {
      if (i < messages.length) {
        setCurrentMessage(messages[i]);
        setShowModal(true);
        playConfetti();
        navigator.vibrate?.(300);

        setTimeout(() => {
          setShowModal(false);
        }, 1500);

        i++;
      } else {
        clearInterval(interval);
        setIsPlaying(false);
        audioRef.current?.pause();
      }
    }, 2000);
  };

  const handleTease = () => {
    const randomTease = teasingMessages[Math.floor(Math.random() * teasingMessages.length)];
    setTeaseMessage(randomTease);
    setShowTease(true);

    setTimeout(() => {
      setShowTease(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 flex items-center justify-center p-6 relative overflow-hidden">
      <main className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-10 max-w-md w-full text-center transform hover:scale-105 transition-all duration-300">
        <div className="mb-10 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full blur opacity-30" />
          <Image
            src="/kd.jpeg"
            alt="Motivasi Icon"
            width={220}
            height={220}
            className="mx-auto rounded-full shadow-lg hover:shadow-xl transition duration-300 relative z-10"
            priority
          />
        </div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Hai Teman!
        </h1>

        <div className="space-y-5 text-gray-700">
          <p className="text-2xl font-medium animate-pulse">
            Semangat terus menjalani harimu! 💪
          </p>
          <p className="text-xl">
            Kamu pasti bisa melewati semua tantangan hari ini!
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <button
            onClick={handleClick}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:-translate-y-1 hover:shadow-lg w-full"
          >
            Kirim Semangat! ✨
          </button>
          <button
            onClick={handleTease}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:-translate-y-1 hover:shadow-lg w-full"
          >
            Peluk Virtual 🤗
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-600 italic font-medium">
          Ingat, setiap hari adalah kesempatan baru untuk jadi lebih baik! ⭐
        </p>
      </main>

      {showModal && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl z-50 animate-fade-in cursor-pointer border-2 border-blue-500"
        >
          <p className="text-xl font-bold text-gray-800">{currentMessage}</p>
          <div className="h-1 w-full bg-blue-100 mt-3 overflow-hidden rounded-full">
            <div className="h-full bg-blue-500 animate-[progress_1.5s_linear]" />
          </div>
        </div>
      )}

      {showTease && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white border border-pink-500 text-pink-700 px-6 py-4 rounded-lg shadow-xl z-50 animate-fade-in-fast text-center max-w-sm w-full">
          <p className="text-sm font-semibold">{teaseMessage}</p>
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        @keyframes fade-in-fast {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-fast {
          animation: fade-in-fast 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
