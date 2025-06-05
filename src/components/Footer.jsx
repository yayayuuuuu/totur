const Footer = () => {
    return (
        <footer className="bg-[#2B5659] w-full flex flex-col md:flex-row items-center justify-evenly  py-6 md:h-40 gap-6 md:gap-0">
            {/* 標題區塊 */}
            <div className="footer-title text-center md:text-left">
                <p className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-white">Tutor Track</p>
            </div>

            {/* 分隔線 */}
            <div className="hidden md:block w-px h-4/5 bg-white" />

            {/* 聯絡資訊區塊 */}
            <div className="footer-info text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-3">
                    <img src="/images/envelope_1.svg" className="w-5 h-5 mx-2" alt="email" />
                    <p className="text-white text-sm sm:text-base">s111234567@stu.ntue.edu.tw</p>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                    <img src="/images/mail_1.svg" className="w-5 h-5 mx-2" alt="phone" />
                    <p className="text-white text-sm sm:text-base">(02)2732-1104</p>
                </div>
            </div>

            {/* 分隔線 */}
            <div className="hidden md:block w-px h-4/5 bg-white" />

            {/* icon 區塊 */}
            <div className="footer-icons flex justify-center gap-3">
                <img src="/images/fb_1.svg" className="w-6 h-6" alt="Facebook" />
                <img src="/images/ig_1.svg" className="w-6 h-6" alt="Instagram" />
                <img src="/images/x_1.svg" className="w-6 h-6" alt="X" />
                <img src="/images/yt_1.svg" className="w-6 h-6" alt="YouTube" />
            </div>
        </footer>
    );
};

export default Footer;
