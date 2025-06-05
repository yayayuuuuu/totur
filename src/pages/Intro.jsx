import { Link } from "react-router"

import Header from '../components/Header'
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
      <div className=" justify-items-center">
        {/* <button className="border border-2 rounded-sm">
                <Link to="/auth/signin">
                    <p className="text-[#000000] px-4 py-2">登入</p>
                </Link>

            </button> */}

        <div className="w-7/10">


          <div className="my-20 flex items-center justify-between max-md:flex-col">
            <div className="first text-left max-md:text-left">
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
                <p className="text-xl sm:text-2xl font-bold text-[#354B7A] pb-2 max-md:p-0">1. 記錄學生學習狀況</p>
                <p className="text-xl sm:text-2xl font-bold text-[#354B7A] py-2 max-md:p-0">2. 整理學生檔案</p>
                <p className="text-xl sm:text-2xl font-bold text-[#354B7A] py-2 max-md:p-0">3. 課程行事曆</p>
              </div>
            </div>

            <img src="/images/intro 1.png" className="rounded-sm shadow-md border-3 border-[#228991] h-50 w-auto" />
          </div>

          <div className="second my-20 mt-30">
            <div className="mb-5 flex items-center justify-between max-md:flex-col">
              {/* <p className="text-2xl font-bold  text-[#354B7A]">管理教學進度</p> */}
              <FadeInWhenVisible className="text-2xl sm:text-4xl font-bold text-[#354B7A]">管理教學進度</FadeInWhenVisible>

              <img src="/images/Frame 43.svg" className=" h-8 w-auto" />
            </div>

            <div className="flex items-center justify-between max-md:block">

              <div className="w-1/3 max-md:w-3/4 max-md:justify-self-center">
                <FadeInWhenVisible>
                  <p className="sm:text-lg text-[#354B7A] text-left max-md:pb-5 leading-loose">網站內建上課紀錄功能，讓老師可以直接在平台上撰寫每堂課的教學內容、學生表現與課堂進度。無需額外工具，所有紀錄集中管理，方便回顧與追蹤。</p>
                </FadeInWhenVisible>

              </div>

              <img src="/images/intro 2.png" className="rounded-sm shadow-md border-3 border-[#228991] h-50 w-auto" />
            </div>

          </div>

          <div className="third mt-30">
            <div className="mb-5 flex items-center justify-between max-md:flex-col">
              {/* <p className="text-2xl font-bold  text-[#354B7A]">記錄學生資訊</p> */}
              <FadeInWhenVisible className="text-2xl sm:text-4xl font-bold text-[#354B7A]">記錄學生資訊</FadeInWhenVisible>

              <img src="/images/Frame 26.svg" className="mx-4 h-8 w-auto" />
            </div>

            <div className="flex items-center justify-between max-md:block">

              <div className="w-1/3 max-md:w-3/4 max-md:justify-self-center">
                <FadeInWhenVisible>

                  <p className="sm:text-lg text-[#354B7A] text-left max-md:pb-5 leading-loose">集中管理學生基本資料，包括年級、聯絡方式、個性特質、成績等，減少紙本混亂，讓資訊隨時可查、即時更新。</p>
                </FadeInWhenVisible>
              </div>
              <img src="/images/intro 3.png" className="rounded-sm shadow-md border-3 border-[#228991] h-50 w-auto" />

            </div>
          </div>

          <div className="fourth justify-items-start mt-20 mb-10">
            {/* <p className="text-2xl font-bold  text-[#354B7A] max-md:justify-self-center">業界前輩分享</p> */}
            <FadeInWhenVisible className="text-2xl sm:text-4xl font-bold text-[#354B7A] max-md:justify-self-center">
              業界前輩分享
            </FadeInWhenVisible>
            <img src="/images/recommend.png" className="" />
          </div>
        </div>

        <div className="signup bg-[#FFFFD0] w-full h-48 flex items-center justify-center">
          <div className="">
            <p className="my-3 text-xl font-bold text-[#354B7A] mb-10">立即免費註冊</p>
            <button className="animate-bounce border border-2 !border-[#354B7A] rounded-full hover:!border-[#747bff] ">
              <Link to="/signup">
                <p className="text-[#354B7A] hover:!text-[#747bff] px-4 py-2">註冊</p>
              </Link>
            </button>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Intro;