import { Link } from "react-router";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const FadeInWhenVisible = ({ children, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);

function Intro() {
  return (
    <div>
      <Header />

      <div className="max-w-6xl mx-auto px-4">
        {/* Section 1 */}
        <div className="my-20 flex items-center justify-between max-md:flex-col">
          <div className="first text-left max-md:text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.7 },
              }}>
              <p className="text-3xl sm:text-5xl font-bold pb-10 text-[#354B7A] max-md:pb-8">
                家教老師的最強幫手
              </p>
            </motion.div>

            <div className="max-md:mb-8">
              <p className="text-xl sm:text-2xl font-bold text-[#354B7A] pb-2 max-md:text-center">1. 記錄學生學習狀況</p>
              <p className="text-xl sm:text-2xl font-bold text-[#354B7A] py-2 max-md:text-center">2. 整理學生檔案</p>
              <p className="text-xl sm:text-2xl font-bold text-[#354B7A] py-2 max-md:text-center">3. 課程行事曆</p>
            </div>
          </div>

          <img src="/images/intro_1.png" className="rounded-sm shadow-md border-3 border-[#228991] h-50 w-auto max-md:mx-auto" />
        </div>

        {/* Section 2 */}
        <div className="second my-20 mt-30">
          <div className="mb-5 flex items-center justify-between max-md:flex-col max-md:text-center">
            <FadeInWhenVisible className="text-2xl sm:text-4xl font-bold text-[#354B7A]">管理教學進度</FadeInWhenVisible>
            <img src="/images/Frame 43.svg" className="h-8 w-auto max-md:mt-2" />
          </div>

          <div className="flex items-center justify-between max-md:flex-col">
            <div className="w-1/3 max-md:w-full max-md:text-center">
              <FadeInWhenVisible>
                <p className="sm:text-lg text-[#354B7A] text-left max-md:text-center max-md:pb-5 leading-loose">
                  網站內建上課紀錄功能，讓老師可以直接在平台上撰寫每堂課的教學內容、學生表現與課堂進度。無需額外工具，所有紀錄集中管理，方便回顧與追蹤。
                </p>
              </FadeInWhenVisible>
            </div>
            <img src="/images/intro_2.png" className="rounded-sm shadow-md border-3 border-[#228991] h-50 w-auto max-md:mx-auto" />
          </div>
        </div>

        {/* Section 3 */}
        <div className="third mt-30">
          <div className="mb-5 flex items-center justify-between max-md:flex-col max-md:text-center">
            <FadeInWhenVisible className="text-2xl sm:text-4xl font-bold text-[#354B7A]">記錄學生資訊</FadeInWhenVisible>
            <img src="/images/Frame 26.svg" className="mx-4 h-8 w-auto max-md:mt-2" />
          </div>

          <div className="flex items-center justify-between max-md:flex-col">
            <div className="w-1/3 max-md:w-full max-md:text-center">
              <FadeInWhenVisible>
                <p className="sm:text-lg text-[#354B7A] text-left max-md:text-center max-md:pb-5 leading-loose">
                  集中管理學生基本資料，包括年級、聯絡方式、個性特質、成績等，減少紙本混亂，讓資訊隨時可查、即時更新。
                </p>
              </FadeInWhenVisible>
            </div>
            <img src="/images/intro_3.png" className="rounded-sm shadow-md border-3 border-[#228991] h-50 w-auto max-md:mx-auto" />
          </div>
        </div>

        {/* Section 4 */}
        <div className="fourth justify-items-start mt-20 mb-10 text-center">
          <FadeInWhenVisible className="text-2xl sm:text-4xl font-bold text-[#354B7A]">業界前輩分享</FadeInWhenVisible>
          <img src="/images/recommend.png" className="mx-auto" />
        </div>
      </div>

      {/* 註冊區塊 */}
      <div className="signup bg-[#FFFFD0] w-full h-48 flex items-center justify-center">
        <div className="text-center">
          <p className="my-3 text-xl font-bold text-[#354B7A] mb-10">立即免費註冊</p>
          <button className="animate-bounce border border-2 !border-[#354B7A] rounded-full hover:!border-[#747bff] ">
            <Link to="/signup">
              <p className="text-[#354B7A] hover:!text-[#747bff] px-4 py-2">註冊</p>
            </Link>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Intro;
