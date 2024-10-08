import { useEffect, useState } from "react";
import bgLogin from "../assets/background-login.jpg";

const SideLoginSection = () => {
  const words = ["ENIGMA", "NIGMA", "AIMENG", "MEGIAN", "IGANME"]; // Daftar kata yang ingin ditampilkan
  const [currentWord, setCurrentWord] = useState(words[0]); // Inisialisasi dengan kata pertama

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prevWord) => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length; // Beralih ke kata berikutnya
        return words[nextIndex];
      });
    }, 1000); // Ubah kata setiap 1 detik

    return () => clearInterval(interval); // Hentikan interval saat komponen tidak lagi digunakan
  }, [words]);

  return (
    <div
      className="flex pl-10 justify-center items-center text-white font-bold text-8xl"
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${bgLogin})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >
      SELAMAT DATANG DI {currentWord} LAUNDRY
    </div>
  );
};

export default SideLoginSection;
