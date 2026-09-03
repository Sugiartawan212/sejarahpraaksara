"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react'; // Pastikan lucide-react ter-install

// Data 10 Soal Tingkat Kesulitan Tinggi — Materi Zaman Pra-Aksara
const quizData = [
  {
    question: "Pernyataan mana yang *paling akurat* mendefinisikan esensi dari zaman pra-aksara?",
    options: [
      "Masa di mana manusia purba belum memiliki kebudayaan dan peradaban yang terstruktur.",
      "Periode ketika aktivitas manusia murni digerakkan oleh insting tanpa adanya sistem sosial.",
      "Masa transisi antara penggunaan alat batu kasar menuju penemuan aksara pertama di prasasti.",
      "Era di mana manusia telah menghasilkan sejarah dan kebudayaan, namun belum meninggalkan jejak rekam berupa tulisan."
    ],
    answerIndex: 3
  },
  {
    question: "Penemuan Kjokkenmoddinger dan Abris sous roche pada zaman Mesolitikum membuktikan pergeseran paling mendasar dalam hidup manusia, yaitu...",
    options: [
      "Peralihan dari berburu dan meramu menjadi masyarakat agraris yang sepenuhnya menetap di satu tempat.",
      "Perubahan dari gaya hidup nomaden total menuju kehidupan semi-sedenter yang memanfaatkan sumber daya perairan dan gua.",
      "Kemampuan manusia purba dalam membangun tempat tinggal permanen dari material tumpukan kulit kerang.",
      "Bukti bahwa manusia Mesolitikum telah meninggalkan tradisi berburu dan sepenuhnya bergantung pada hasil laut."
    ],
    answerIndex: 1
  },
  {
    question: "Mengapa masa Neolitikum sering disebut sebagai fase terjadinya 'revolusi kebudayaan' terbesar dalam sejarah manusia purba?",
    options: [
      "Karena terjadinya perubahan drastis dari pola hidup bergantung pada alam (food gathering) menjadi penghasil makanan (food producing).",
      "Karena manusia mulai menghentikan penggunaan alat batu dan beralih menggunakan peralatan dan perhiasan dari logam.",
      "Karena manusia berhasil menemukan api untuk pertama kalinya dan mengubah pola makan mereka menjadi serba matang.",
      "Karena munculnya kepercayaan animisme dan dinamisme yang ditandai dengan pembangunan menhir skala besar."
    ],
    answerIndex: 0
  },
  {
    question: "Jika seorang arkeolog menemukan kapak lonjong yang permukaannya sudah diasah sangat halus, kesimpulan mana yang PALING KELIRU terkait temuan tersebut?",
    options: [
      "Alat tersebut kemungkinan besar digunakan oleh masyarakat yang sudah mengenal tradisi bercocok tanam.",
      "Pemilik alat tersebut kemungkinan sudah tinggal secara menetap dan membentuk perkampungan.",
      "Pemilik alat tersebut masih hidup secara nomaden dan berpindah mengikuti gerak hewan buruan.",
      "Alat tersebut merupakan salah satu hasil kebudayaan dari zaman batu muda (Neolitikum)."
    ],
    answerIndex: 2
  },
  {
    question: "Zaman Megalitikum memiliki keunikan dibandingkan pembagian zaman batu lainnya. Manakah dari pernyataan berikut yang menjelaskan status Megalitikum secara tepat?",
    options: [
      "Megalitikum adalah zaman yang berdiri sendiri dan memisahkan secara tegas antara zaman Neolitikum dan Perundagian.",
      "Megalitikum bukanlah sebuah zaman yang terisolasi, melainkan tradisi kebudayaan yang muncul di akhir Neolitikum hingga masa Perundagian.",
      "Tradisi Megalitikum hanya muncul ketika manusia sudah mengenal teknologi peleburan besi dan perunggu tingkat tinggi.",
      "Semua manusia purba di dunia wajib melewati fase kebudayaan Megalitikum sebelum mereka bisa membuat gerabah."
    ],
    answerIndex: 1
  },
  {
    question: "Istilah 'Perundagian' berasal dari kata undagi. Keberadaan golongan undagi ini mengindikasikan sebuah perubahan sosial yang sangat penting, yaitu...",
    options: [
      "Masyarakat mulai dipimpin oleh seorang raja yang memiliki keahlian magis dalam memanggil hujan.",
      "Munculnya spesialisasi pekerjaan dan stratifikasi sosial berdasarkan keahlian khusus, bukan sekadar kemampuan berburu.",
      "Sistem barter telah sepenuhnya ditinggalkan dan digantikan oleh peredaran uang logam buatan para undagi.",
      "Seluruh anggota masyarakat tanpa terkecuali diwajibkan memiliki kemampuan melebur tembaga dan perunggu."
    ],
    answerIndex: 1
  },
  {
    question: "Terdapat berbagai peninggalan zaman Megalitikum dengan fungsi spesifik. Pasangan artefak dan fungsi yang paling tepat adalah...",
    options: [
      "Dolmen: Peti mati dari batu utuh untuk menyimpan jenazah ketua suku atau tokoh penting.",
      "Sarkofagus: Meja batu datar untuk meletakkan sesaji dalam ritual pemujaan.",
      "Punden Berundak: Senjata upacara yang terbuat dari batuan vulkanik tajam.",
      "Menhir: Tugu batu tegak sebagai medium penghormatan dan lambang perwujudan roh nenek moyang."
    ],
    answerIndex: 3
  },
  {
    question: "Nekara dan Moko adalah artefak perunggu kebanggaan masa Perundagian. Berdasarkan bentuk dan ukirannya, fungsi utama dari benda-benda ini kemungkinan besar adalah...",
    options: [
      "Sebagai alat masak sehari-hari bagi golongan keluarga bangsawan atau tetua adat.",
      "Sebagai benda sakral untuk upacara keagamaan (memanggil hujan) atau sebagai mas kawin.",
      "Sebagai wadah penampung air hujan untuk mendukung sistem irigasi pertanian massal.",
      "Sebagai alat tukar (uang) resmi dalam jalur perdagangan internasional antar pulau."
    ],
    answerIndex: 1
  },
  {
    question: "Transisi dari masa berburu-meramu (food gathering) ke bercocok tanam (food producing) memakan waktu ribuan tahun. Faktor utama apakah yang paling logis memaksa mereka untuk bercocok tanam?",
    options: [
      "Persediaan makanan di alam (hewan dan tumbuhan liar) mulai tidak menentu dan menipis akibat cuaca atau eksploitasi.",
      "Mereka merasa bosan hidup berpindah-pindah dan secara kebetulan menemukan lahan gandum di dekat gua.",
      "Mereka diajarkan oleh kelompok bangsa pendatang yang sudah memiliki peradaban dan teknologi lebih modern.",
      "Adanya instruksi dari ketua suku untuk mulai merintis pendirian kerajaan agraris pertama."
    ],
    answerIndex: 0
  },
  {
    question: "Perhatikan urutan sebab-akibat evolusi kehidupan pra-aksara berikut! Manakah alur logika yang paling tepat secara historis?",
    options: [
      "Hidup menetap → menemukan kapak genggam → mulai beternak → menciptakan api.",
      "Menemukan perunggu → hidup berkelompok kecil → bercocok tanam → membuat abris sous roche.",
      "Bergantung pada alam → menggunakan alat batu kasar → food producing → pembagian kerja kompleks (undagi).",
      "Tinggal di gua → membuat alat batu dihaluskan (Neolitikum) → kembali nomaden → menemukan teknik peleburan logam."
    ],
    answerIndex: 2
  }
];

export default function QuizSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswerOptionClick = (index: number) => {
        if (isAnswered) return; // Cegah klik ganda

        setSelectedOption(index);
        setIsAnswered(true);

        const isCorrect = index === quizData[currentQuestion].answerIndex;
        if (isCorrect) {
            setScore(score + 1);
        }

        // Jeda 1.5 detik untuk melihat jawaban benar/salah, lalu lanjut soal berikutnya
        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < quizData.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedOption(null);
                setIsAnswered(false);
            } else {
                setShowScore(true);
            }
        }, 1500);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption(null);
        setIsAnswered(false);
    };

    return (
        <section id="quiz" className="bg-[#EEEBE4] py-24 md:py-32 relative overflow-hidden" ref={ref}>
            <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">

                {/* Header Kuis (Mirip Header Testimoni) */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center gap-4 mb-4"
                    >
                        <div className="h-px w-8 bg-[#5C7A5A]"></div>
                        <span className="text-[#5C7A5A] font-bold tracking-[0.2em] text-xs uppercase">
                            Evaluasi Pemahaman
                        </span>
                        <div className="h-px w-8 bg-[#5C7A5A]"></div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-light text-[#2A2A27] tracking-tight"
                    >
                        Uji <span className="font-serif italic text-[#5C7A5A] font-bold">Pengetahuanmu</span>
                    </motion.h2>
                </div>

                {/* Kartu Kuis (Modifikasi dari Kartu Testimoni) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-[#E2DECA]/80 backdrop-blur-sm border border-white/40 p-8 md:p-12 rounded-[2rem] shadow-xl min-h-[450px] flex flex-col justify-center relative overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        {showScore ? (
                            /* --- TAMPILAN SKOR AKHIR --- */
                            <motion.div
                                key="score"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="text-center"
                            >
                                <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#2A2A27] mb-6">
                                    Kuis Selesai!
                                </h3>
                                <div className="inline-flex flex-col items-center justify-center w-32 h-32 rounded-full bg-[#5C7A5A] text-white shadow-lg mb-8">
                                    <span className="text-4xl font-bold">{score * 10}</span>
                                    <span className="text-xs uppercase tracking-widest opacity-80 mt-1">Poin</span>
                                </div>
                                <p className="text-[#2A2A27]/80 text-lg mb-8">
                                    Kamu berhasil menjawab <strong>{score}</strong> dari <strong>{quizData.length}</strong> pertanyaan dengan benar.
                                </p>
                                <button
                                    onClick={restartQuiz}
                                    className="inline-flex items-center gap-2 bg-[#2A2A27] text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#4a4a45] hover:scale-105 transition-all duration-300"
                                >
                                    <RotateCcw className="w-4 h-4" /> Ulangi Kuis
                                </button>
                            </motion.div>
                        ) : (
                            /* --- TAMPILAN PERTANYAAN --- */
                            <motion.div
                                key={currentQuestion}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="w-full"
                            >
                                {/* Progress Bar Mini */}
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-[#5C7A5A] font-bold tracking-[0.2em] text-xs uppercase">
                                        Pertanyaan {currentQuestion + 1} / {quizData.length}
                                    </span>
                                    <div className="flex gap-1">
                                        {quizData.map((_, idx) => (
                                            <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentQuestion ? 'bg-[#5C7A5A]' : idx < currentQuestion ? 'bg-[#5C7A5A]/40' : 'bg-[#2A2A27]/10'}`}></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Teks Pertanyaan */}
                                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#2A2A27] leading-relaxed mb-8">
                                    {quizData[currentQuestion].question}
                                </h3>

                                {/* Pilihan Ganda */}
                                <div className="space-y-3">
                                    {quizData[currentQuestion].options.map((option, index) => {
                                        const isCorrect = index === quizData[currentQuestion].answerIndex;
                                        const isSelected = selectedOption === index;

                                        // Logika pewarnaan tombol saat dijawab
                                        let buttonStyle = "bg-white text-[#2A2A27]/80 hover:bg-[#F5F5F5] border-transparent";
                                        if (isAnswered) {
                                            if (isCorrect) {
                                                buttonStyle = "bg-[#5C7A5A] text-white border-[#5C7A5A] shadow-md"; // Hijau kalau benar
                                            } else if (isSelected && !isCorrect) {
                                                buttonStyle = "bg-red-500/10 text-red-600 border-red-500/50"; // Merah kalau salah pilih
                                            } else {
                                                buttonStyle = "bg-white/50 text-[#2A2A27]/40 border-transparent opacity-50"; // Sisanya meredup
                                            }
                                        }

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswerOptionClick(index)}
                                                disabled={isAnswered}
                                                className={`w-full text-left px-6 py-4 rounded-xl border text-sm md:text-base transition-all duration-300 flex items-start md:items-center justify-between gap-4 ${buttonStyle}`}
                                            >
                                                <span className="leading-relaxed">{option}</span>

                                                {/* Ikon Muncul setelah dijawab */}
                                                {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-white" />}
                                                {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 flex-shrink-0 text-red-500" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    );
}