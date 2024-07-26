// template bg video with multi language
import "../../app.scss";
import style from "./main.module.scss";
import { Link, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import Countdown from "react-countdown";
import Header from "../components/Header";
import Footer from "../components/Footer";

// import icons
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineMusicOff, MdOutlineMusicNote } from "react-icons/md";

// add to Google calender
import "add-to-calendar-button";

// animate aos
import sal from "sal.js";

// multi language
import { useTranslation } from "react-i18next";

// import service
import { getMessages, sendMessage } from "../../services/message.service";

// import audio
import { useAudio } from "../../hooks/useAudio";
import audioBacksound from "../../assets/music/backsounds-1.mp3";

// import assets
import {
  manPhoto,
  womanPhoto,
  icInstagram,
  icMaps,
  giftPhoto,
  icCopy,
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  footerPhoto,
  videoCouple,
  videoBg,
} from "../../assets";
import ModalImage from "../components/ModalImage";
import ModalVideo from "../components/ModalVideo";
import { atcb_action } from "add-to-calendar-button";
import { DarkMode } from "../../context/DarkMode";

const Main = () => {
  const [play, setPlay] = useState(false);
  const [playing, toggleSound] = useAudio(audioBacksound);

  const [searchParams] = useSearchParams();
  const idMessage = import.meta.env.VITE_CLIENT_ID;
  const [name, setName] = useState(searchParams.get("to"));
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState("");
  const [isNull, setIsNull] = useState(true);
  const [dataMessage, setDataMessage] = useState([]);
  const [isShowImage, setIsShowImage] = useState(false);
  const [isShowVideo, setIsShowVideo] = useState(false);
  const [imageShow, setImageShow] = useState("");
  const [videoShow, setVideoShow] = useState("");
  const [activeNavbar, setActiveNavbar] = useState("");

  useEffect(() => {
    setPlay(true);
    if (play === true) {
      toggleSound();
    }
  }, [play]);

  useEffect(() => {
    if (name !== "" && message !== "" && attendance !== "") {
      setIsNull(false);
    }
  }, [name, message, attendance]);

  const handleGetMessage = () => {
    getMessages(idMessage, (data) => {
      if (data) {
        setDataMessage(data);
      }
    });
  };

  useEffect(() => {
    handleGetMessage();
  }, []);

  const handleMessage = (event) => {
    event.preventDefault();

    let name = event.target.name.value;
    let message = event.target.message.value;
    let attendance = event.target.attendance.value;
    const data = {
      id_message: idMessage,
      name: name,
      message: message,
      attendance: parseInt(attendance),
      date_created: moment().format("DD-MM-YYYY hh:mm:ss"),
      deleted_at: null,
    };

    sendMessage(data, (status) => {
      if (status.status === true) {
        setIsNull(true);
        handleGetMessage();
        setName(searchParams.get("to"));
        setMessage("");
        setAttendance("");
      }
    });
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div className="flex flex-row items-center justify-between mt-44 gap-9">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-2 text-base text-white border-b-2 roboto-bold border-soft-white">
              00
            </div>
            <span className="text-sm text-white roboto-regular">
              {t("home.countdownDay")}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-2 text-base text-white border-b-2 roboto-bold border-soft-white">
              00
            </div>
            <span className="text-sm text-white roboto-regular">
              {t("home.countdownHours")}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-2 text-base text-white border-b-2 roboto-bold border-soft-white">
              00
            </div>
            <span className="text-sm text-white roboto-regular">
              {t("home.countdownMinutes")}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-2 text-base text-white border-b-2 roboto-bold border-soft-white">
              00
            </div>
            <span className="text-sm text-white roboto-regular">
              {t("home.countdownSecond")}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row items-center justify-between mt-44 gap-9">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-2 text-base text-white border-b-2 roboto-bold border-soft-white">
              {days}
            </div>
            <span className="text-sm text-white roboto-regular">
              {t("home.countdownDay")}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-2 text-base text-white border-b-2 roboto-bold border-soft-white">
              {hours}
            </div>
            <span className="text-sm text-white roboto-regular">
              {t("home.countdownHours")}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-2 text-base text-white border-b-2 roboto-bold border-soft-white">
              {minutes}
            </div>
            <span className="text-sm text-white roboto-regular">
              {t("home.countdownMinutes")}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-2 text-base text-white border-b-2 roboto-bold border-soft-white">
              {seconds}
            </div>
            <span className="text-sm text-white roboto-regular">
              {t("home.countdownSecond")}
            </span>
          </div>
        </div>
      );
    }
  };
  // harus dari env
  const targetDate = new Date(import.meta.env.VITE_CLIENT_DATE_COUNTDOWN);

  // import sal animate on scroll
  useEffect(() => {
    sal({
      // replay animation
      threshold: 0.5,
      // once load animation
      once: false,
    });
  }, []);

  const showDetailImage = (image) => {
    setIsShowImage(!isShowImage);
    setImageShow(image);
  };

  const showDetailVideo = (video) => {
    setIsShowVideo(!isShowVideo);
    setVideoShow(video);
  };

  // multi language
  const [t] = useTranslation("global");

  // navbar change background blur
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const position = Math.ceil(
      (scrollTop / (scrollHeight - clientHeight)) * 100
    );

    if (position > 0) {
      setActiveNavbar("backdrop-blur-sm	");
    } else {
      setActiveNavbar("");
    }
  };

  // add to Google calender
  const config = {
    description: "Mohon keharidarannya semua",
    startDate: "2024-07-21",
    endDate: "2024-07-26",
    startTime: "10:15",
    endTime: "23:30",
    options: ["Google"],
    name: "Qisti Elgi Wedding",
    location:
      "Jl. Raya Cinunuk No.186, Cinunuk, Kec. Cileunyi, Kabupaten Bandung, Jawa Barat 40624",
    lightMode: "bodyScheme",
    organizer: "Wedinc.id",
  };
  const button = document.getElementById("btnAddToCalender");
  if (button) {
    button.addEventListener("click", () => atcb_action(config, button));
  }

  // darkmode
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

  return (
    <>
      <div className="relative w-full h-full">
        {/* modal image */}
        {isShowImage && (
          <ModalImage
            image={imageShow}
            onClose={() => setIsShowImage(false)}
          ></ModalImage>
        )}

        {/* modal video */}
        {isShowVideo && (
          <ModalVideo
            video={videoShow}
            onClose={() => setIsShowVideo(false)}
          ></ModalVideo>
        )}

        <div
          className={`bg-black container max-w-screen-sm h-svh overflow-scroll flex flex-col`}
          onScroll={handleScroll}
        >
          {/* bg video */}
          <div className="absolute flex flex-row w-full h-full max-w-screen-sm">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full"
              loading="lazy"
              // onCanPlayThrough={() => {
              //   setVideoLoad(false);
              // }}
              // poster={gallery2}
            >
              <source src={videoBg}></source>
            </video>
          </div>

          <div
            className={`container fixed items-center z-20 right-1 flex flex-col  ${activeNavbar}`}
          >
            <Header />
          </div>

          <div
            className={`container flex flex-col items-center h-full relative`}
          >
            {/* section event */}
            <span className="mt-40 text-xs font-light text-white roboto-light">
              {t("home.title")}
            </span>
            <span className="mt-4 text-5xl font-light text-white great-vibes-regular">
              {import.meta.env.VITE_CLIENT_NAME}
            </span>
            <span className="mt-2 text-xs font-light text-white roboto-light">
              {import.meta.env.VITE_CLIENT_DATE}
            </span>
            <Countdown date={targetDate} renderer={renderer} />
            <span
              className="px-10 mt-24 text-sm text-justify text-white text-pretty roboto-regular"
              data-sal="fade"
              data-sal-duration="2000"
            >
              {t("home.qoutes")}
            </span>

            {/* section man */}
            <div className="flex flex-col items-start w-full px-10">
              <img
                src={manPhoto}
                className="mt-12"
                data-sal="zoom-out"
                data-sal-duration="2000"
                loading="lazy"
              />
              <span
                className="mt-5 text-xl text-white roboto-medium"
                data-sal="fade"
                data-sal-duration="2000"
              >
                Elgi Riyadi Putra
              </span>
              <span
                className="text-xs text-white"
                data-sal="fade"
                data-sal-duration="2000"
              >
                {t("home.manSubtitle")}
              </span>
              <span
                className="mt-3 text-sm text-white"
                data-sal="fade"
                data-sal-duration="2000"
              >
                {t("home.manDescription")}
              </span>
              <Link
                to="https://www.instagram.com/elgirputra/"
                target="_blank"
                className="flex flex-row items-center gap-3 mt-5"
                data-sal="fade"
                data-sal-duration="2000"
              >
                <img
                  src={icInstagram}
                  className="object-cover h-5"
                  loading="lazy"
                />
                <span className="text-sm text-white roboto-medium">Elgi</span>
              </Link>
            </div>

            {/* section woman */}
            <div className="flex flex-col items-end w-full px-10 mt-12 mb-12">
              <img
                src={womanPhoto}
                data-sal="zoom-out"
                data-sal-duration="2000"
                loading="lazy"
              />
              <span
                className="mt-5 text-xl text-white roboto-medium"
                data-sal="fade"
                data-sal-duration="2000"
              >
                Qisti Astami Marifah
              </span>
              <span
                className="text-xs text-white"
                data-sal="fade"
                data-sal-duration="2000"
              >
                {t("home.womanSubtitle")}
              </span>
              <span
                className="mt-3 text-sm text-white text-end"
                data-sal="fade"
                data-sal-duration="2000"
              >
                {t("home.womanDescription")}
              </span>
              <Link
                to="https://www.instagram.com/qistiastami/"
                target="_blank"
                className="flex flex-row items-center gap-3 mt-5"
                data-sal="fade"
                data-sal-duration="2000"
              >
                <img
                  src={icInstagram}
                  className="object-cover h-5"
                  loading="lazy"
                />
                <span className="text-sm text-white roboto-medium">Qisti</span>
              </Link>
            </div>

            {/* section journey and holy motrimony*/}
            <div className={`container max-w-screen-sm flex flex-col px-10`}>
              <span
                className="mt-5 text-4xl leading-tight text-white roboto-light"
                data-sal="fade"
                data-sal-duration="2000"
              >
                {t("home.journeyTitleStart")} <br />
                <span className="roboto-medium">Qisti & Elgi</span> <br />
                {t("home.journeyTitleEnd")}
              </span>
              <span
                className="mt-2 text-sm text-white text-pretty"
                data-sal="fade"
                data-sal-duration="2000"
                style={{ textAlign: "justify" }}
              >
                {t("home.journeyDetail")}
              </span>
              <span
                className="mt-2 text-sm text-white text-pretty"
                data-sal="fade"
                data-sal-duration="2000"
                style={{ textAlign: "justify" }}
              >
                {t("home.journeyDetail1")}
              </span>
              <span
                className="mt-2 text-sm text-white text-pretty"
                data-sal="fade"
                data-sal-duration="2000"
                style={{ textAlign: "justify" }}
              >
                {t("home.journeyDetail2")}
              </span>
              <span
                className="mt-12 text-4xl text-white roboto-light"
                data-sal="fade"
                data-sal-duration="2000"
              >
                {t("home.reception")}
              </span>
              <span
                className="mt-5 text-sm text-white"
                data-sal="fade"
                data-sal-duration="2000"
              >
                {t("home.receptionDate")}
                <br />
                {t("home.receptionTime")}
              </span>
              <div className="flex flex-row items-center justify-start gap-3 mt-3">
                <CiCalendarDate className="text-xl text-white" />
                <button
                  id="btnAddToCalender"
                  className={` text-sm text-white roboto-medium bg-transparent border-0`}
                >
                  Add to Calendar
                </button>
              </div>
              <span
                className="text-sm text-white mt-7 roboto-medium"
                data-sal="fade"
                data-sal-duration="2000"
              >
                Taman Ponyo
              </span>
              <span
                className="mt-1 text-xs leading-normal text-white"
                data-sal="fade"
                data-sal-duration="2000"
              >
                Jl. Raya Cinunuk No.186, Cinunuk, Kec. Cileunyi, Kabupaten
                Bandung, Jawa Barat 40624
              </span>
              <Link
                to="https://maps.app.goo.gl/LoxzCDED2PhWCJB16"
                target="_blank"
                className="flex flex-row items-center gap-3 mt-5 mb-10"
                data-sal="fade"
                data-sal-duration="2000"
              >
                <img src={icMaps} className="object-cover h-5" loading="lazy" />
                <span className="text-sm text-white roboto-medium">
                  {t("home.direct")}
                </span>
              </Link>
            </div>

            {/* section dresscode */}
            <div className={`container max-w-screen-sm flex flex-col px-10`}>
              <span
                className="mt-8 text-4xl text-white roboto-light"
                data-sal="fade"
                data-sal-duration="2000"
              >
                {t("home.dressCode")}
              </span>
              <div className="flex flex-row flex-wrap gap-3 mt-5">
                <div
                  className="w-[80px] h-[80px] bg-[#124076]"
                  data-sal="fade"
                  data-sal-duration="2000"
                >
                  &nbsp;
                </div>
                <div
                  className="w-[80px] h-[80px] bg-[#dfdfdf]"
                  data-sal="fade"
                  data-sal-duration="2000"
                >
                  &nbsp;
                </div>
                <div
                  className="w-[80px] h-[80px] bg-[#dac0a3]"
                  data-sal="fade"
                  data-sal-duration="2000"
                >
                  &nbsp;
                </div>
                <div
                  className="w-[80px] h-[80px] bg-[#fdfdfd]"
                  data-sal="fade"
                  data-sal-duration="2000"
                >
                  &nbsp;
                </div>
                <div
                  className="w-[80px] h-[80px] bg-[#eadbc8]"
                  data-sal="fade"
                  data-sal-duration="2000"
                >
                  &nbsp;
                </div>
              </div>
              <span
                className="mt-12 text-2xl text-white roboto-light"
                data-sal="fade"
                data-sal-duration="2000"
              >
                {t("home.greetingTitle")}
              </span>
              <span
                className="mt-5 text-sm text-white"
                data-sal="fade"
                data-sal-duration="2000"
              >
                {t("home.greetingDetail")}
              </span>
              <form
                onSubmit={handleMessage}
                className="flex flex-col mt-8"
                data-sal="fade"
                data-sal-duration="2000"
              >
                <span className="text-sm text-white">{t("home.formName")}</span>
                <input
                  name="name"
                  className="form"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span className="mt-3 text-sm text-white">
                  {t("home.formMessage")}
                </span>
                <textarea
                  name="message"
                  className="mt-1 form"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <span className="mt-3 text-sm text-white">
                  {t("home.formAttendance")}
                </span>
                <select
                  name="attendance"
                  className="mt-1 form select-form"
                  onChange={(e) => setAttendance(e.target.value)}
                >
                  <option value="" selected={attendance === "" ? true : false}>
                    {t("home.optionAttendance")}
                  </option>
                  <option value="1">{t("home.optionAttendanceCome")}</option>
                  <option value="0">{t("home.optionAttendanceCannot")}</option>
                </select>
                <div className="mt-6 mb-10">
                  <button
                    type="submit"
                    className={`px-8 py-1 rounded ${
                      isNull === true
                        ? `pointer-events-none  text-soft-white-1 ${
                            isDarkMode
                              ? "bg-dark-green-1-disabled"
                              : "bg-dark-green-disabled"
                          }`
                        : `pointer-events-auto text-white ${
                            isDarkMode ? "bg-dark-green-1" : "bg-dark-green"
                          }`
                    }`}
                  >
                    {t("home.submit")}
                  </button>
                </div>
              </form>
              {dataMessage.length > 0 && (
                <>
                  <span className="mt-2 text-2xl text-white roboto-light">
                    {t("home.greetingResultTitle")}
                  </span>
                  <div className="mt-4 mb-5 overflow-scroll max-h-[300px] flex gap-4 flex-col">
                    {dataMessage.map((item, index) => (
                      <div
                        key={index}
                        className={`flex flex-col p-4  rounded-md bg-opacity-60 ${
                          isDarkMode ? "bg-dark-green-1" : "bg-dark-green"
                        }`}
                      >
                        <span
                          className={`text-sm border-b-[1px] pb-2 mb-2 text-soft-white  border-dark-green roboto-medium`}
                        >
                          {t("home.greetingResultFrom")} {item.name} {" - "}{" "}
                          <span className="roboto-light">
                            {item.attendance === 1
                              ? t("home.optionAttendanceCome")
                              : t("home.optionAttendanceCannot")}
                          </span>
                        </span>
                        <span
                          className={`text-sm text-soft-white roboto-medium-italic`}
                        >
                          {'"'}
                          {item.message}
                          {'"'}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {/* {handleGetMessage()} */}
            </div>

            {/* section wedding gift */}
            <div
              className={`container max-w-screen-sm flex flex-col justify-center px-10`}
            >
              <div className="flex flex-row items-end gap-4 mt-20">
                <img
                  src={giftPhoto}
                  className="w-[150px] h-[150px] object-cover"
                  data-sal="zoom-out"
                  data-sal-duration="2000"
                  loading="lazy"
                />
                <span
                  className="text-4xl text-white roboto-light"
                  data-sal="fade"
                  data-sal-duration="2000"
                >
                  {t("home.weddingGiftTitle")}
                </span>
              </div>
              <span
                className="mt-5 text-sm text-white text-pretty"
                data-sal="fade"
                data-sal-duration="2000"
              >
                {t("home.weddingGiftDetail")}
              </span>
              <div className="flex flex-row items-center mt-10 gap-7">
                <div
                  className="flex flex-col"
                  data-sal="zoom-out"
                  data-sal-duration="2000"
                >
                  <div className="flex flex-row items-center gap-3">
                    <span className="text-sm text-white">6395140438</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("6395140438");
                        setTimeout(() => {
                          alert("Copied Successfully");
                        }, 1000);
                      }}
                    >
                      <img
                        src={icCopy}
                        className="object-cover h-3"
                        loading="lazy"
                      />
                    </button>
                  </div>
                  <span className="text-xs text-white">BCA a/n Elgi</span>
                </div>
                <div
                  className="flex flex-col"
                  data-sal="zoom-out"
                  data-sal-duration="2000"
                >
                  <div className="flex flex-row items-center gap-3">
                    <span className="text-sm text-white">0083483919</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("0083483919");
                        setTimeout(() => {
                          alert("Copied Successfully");
                        }, 1000);
                      }}
                    >
                      <img
                        src={icCopy}
                        className="object-cover h-3"
                        loading="lazy"
                      />
                    </button>
                  </div>
                  <span className="text-xs text-white">BCA a/n Qisti</span>
                </div>
              </div>
            </div>

            {/* section engagement or prewedding */}
            <div className={`container max-w-screen-sm flex flex-col px-10`}>
              <span
                className="mt-20 text-4xl text-white roboto-light"
                data-sal="fade"
                data-sal-duration="2000"
              >
                {t("home.gallery")}
              </span>
              <div className="flex flex-col items-center justify-center mt-8">
                <div className="flex flex-row w-full mb-4">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full"
                    data-sal="zoom-out"
                    data-sal-duration="2000"
                    loading="lazy"
                    onClick={() => {
                      showDetailVideo(videoCouple);
                    }}
                  >
                    <source src={videoCouple}></source>
                  </video>
                </div>
                <div className="flex flex-row w-full">
                  <img
                    src={gallery1}
                    className="h-[215px] w-full object-cover"
                    data-sal="zoom-out"
                    data-sal-duration="2000"
                    loading="lazy"
                    onClick={() => {
                      showDetailImage(gallery1);
                    }}
                  />
                  <img
                    src={gallery2}
                    className="h-[215px] w-full object-cover"
                    data-sal="zoom-out"
                    data-sal-duration="2000"
                    loading="lazy"
                    onClick={() => {
                      showDetailImage(gallery2);
                    }}
                  />
                </div>
                <div className="flex flex-row w-full">
                  <img
                    src={gallery3}
                    className="h-[195px] w-full object-cover"
                    data-sal="zoom-out"
                    data-sal-duration="2000"
                    loading="lazy"
                    onClick={() => {
                      showDetailImage(gallery3);
                    }}
                  />
                </div>
                <div className="flex flex-row w-full">
                  <img
                    src={gallery4}
                    className="h-[215px] w-full object-cover"
                    data-sal="zoom-out"
                    data-sal-duration="2000"
                    loading="lazy"
                    onClick={() => {
                      showDetailImage(gallery4);
                    }}
                  />
                  <img
                    src={gallery5}
                    className="h-[215px] w-full object-cover"
                    data-sal="zoom-out"
                    data-sal-duration="2000"
                    loading="lazy"
                    onClick={() => {
                      showDetailImage(gallery5);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* section footer */}
            <div className={`container max-w-screen-sm flex flex-col px-10`}>
              <img
                src={footerPhoto}
                className="mt-20 text-center"
                data-sal="zoom-out"
                data-sal-duration="2000"
                loading="lazy"
              />
              <span
                className="mt-8 text-3xl leading-tight text-white roboto-light"
                data-sal="fade"
                data-sal-duration="2000"
                dangerouslySetInnerHTML={{ __html: t("home.footerTitle") }}
              ></span>
              <span
                className="mt-4 text-sm leading-6 text-white text-pretty roboto-light"
                data-sal="fade"
                data-sal-duration="2000"
              >
                {t("home.footerSubtitle")}
              </span>
              <span
                className="text-2xl font-light text-white mt-11 great-vibes-regular"
                data-sal="fade"
                data-sal-duration="2000"
              >
                Qisti & Elgi
              </span>
              <div className="mb-5 mt-36">
                <Footer data-sal="fade" data-sal-duration="2000" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* button music */}
      <div className={`${style.buttonMusicWrapper}`}>
        <button
          onClick={toggleSound}
          className={`${style.buttonMusic} ${
            isDarkMode ? "bg-dark-green-1" : "bg-dark-green"
          }`}
        >
          {playing ? (
            <MdOutlineMusicNote className="text-xl text-white" />
          ) : (
            <MdOutlineMusicOff className="text-xl text-white" />
          )}
        </button>
      </div>
    </>
  );
};

export default Main;
