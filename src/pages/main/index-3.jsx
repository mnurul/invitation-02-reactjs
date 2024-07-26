// template bg video with English version
import "../../app.scss";
import style from "./main.module.scss";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import Countdown from "react-countdown";
import Footer from "../components/Footer";
import sal from "sal.js";

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
  galler1,
  galler2,
  galler3,
  galler4,
  galler5,
  footerPhoto,
  iconMusicPlay,
  iconMusicPause,
  videoCouple,
  videoBg,
} from "../../assets";

const Main = () => {
  const [play, setPlay] = useState(false);
  const [playing, toggleSound] = useAudio(audioBacksound);

  const [searchParams] = useSearchParams();
  {
    /* harus dari env */
  }
  const idMessage = "invqistielgi06062024";
  const [name, setName] = useState(searchParams.get("to"));
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState("");
  const [isNull, setIsNull] = useState(true);
  const [dataMessage, setDataMessage] = useState([]);

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
            <span className="text-sm text-white roboto-regular">Hari</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-2 text-base text-white border-b-2 roboto-bold border-soft-white">
              00
            </div>
            <span className="text-sm text-white roboto-regular">Jam</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-2 text-base text-white border-b-2 roboto-bold border-soft-white">
              00
            </div>
            <span className="text-sm text-white roboto-regular">Menit</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-2 text-base text-white border-b-2 roboto-bold border-soft-white">
              00
            </div>
            <span className="text-sm text-white roboto-regular">Detik</span>
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
            <span className="text-sm text-white roboto-regular">Hari</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-2 text-base text-white border-b-2 roboto-bold border-soft-white">
              {hours}
            </div>
            <span className="text-sm text-white roboto-regular">Jam</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-2 text-base text-white border-b-2 roboto-bold border-soft-white">
              {minutes}
            </div>
            <span className="text-sm text-white roboto-regular">Menit</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-2 text-base text-white border-b-2 roboto-bold border-soft-white">
              {seconds}
            </div>
            <span className="text-sm text-white roboto-regular">Detik</span>
          </div>
        </div>
      );
    }
  };
  const targetDate = new Date("2024-07-14T09:00:00");

  // import sal animate on scroll
  useEffect(() => {
    sal({
      // replay animation
      threshold: 0.5,
      // once load animation
      once: false,
    });
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <div
          className={`container max-w-screen-sm h-svh overflow-scroll flex flex-col`}
        >
          {/* bg video */}
          <div className="absolute flex flex-row max-w-screen-sm">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full"
              loading="lazy"
            >
              <source src={videoBg}></source>
            </video>
          </div>

          <div
            className={`container flex flex-col items-center h-full relative`}
          >
            {/* section event */}
            <span className="mt-40 text-xs font-light text-white roboto-light">
              The Wedding of
            </span>
            <span className="mt-4 text-5xl font-light text-white great-vibes-regular">
              Qisti & Elgi
            </span>
            <span className="mt-2 text-xs font-light text-white roboto-light">
              14.07.2024
            </span>
            <Countdown date={targetDate} renderer={renderer} />
            <span
              className="px-10 mt-24 text-sm text-justify text-white text-pretty roboto-regular"
              data-sal="fade"
              data-sal-duration="2000"
            >
              “Dan di antara tanda-tanda (kebesaran)-Nya adalah Dia menciptakan
              pasangan-pasangan untukmu dari jenismu sendiri, agar kamu
              cenderung dan merasa tenteram kepadanya, dan Dia menjadikan
              diantaramu rasa kasih dan sayang. Sungguh pada yang demikian itu
              benar-benar terdapat tanda-tanda kebesaran Allah bagi kaum yang
              berpikir.” (QS. Ar-Rum: 21)
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
                The third child of three siblings:
              </span>
              <span
                className="mt-3 text-sm text-white"
                data-sal="fade"
                data-sal-duration="2000"
              >
                The child of Mr.H. Slamet and Mrs.Hj. Euis, born in Bandung on
                December 19, 1995
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
                The first child of two siblings:
              </span>
              <span
                className="mt-3 text-sm text-white text-end"
                data-sal="fade"
                data-sal-duration="2000"
              >
                The child of Mr.Ir. Agus Jindar Mukhfid and Mrs. Siti Suwarni,
                S.E , born in Bandung on June 22, 1995
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
            <div
              className={`container max-w-screen-sm h-full flex flex-col px-10`}
            >
              <span
                className="mt-5 text-4xl leading-tight text-white roboto-light"
                data-sal="fade"
                data-sal-duration="2000"
              >
                A journey in love: <br />
                <span className="roboto-medium">Qisti & Elgi</span> <br />
                Connection
              </span>
              <span
                className="mt-2 text-sm text-white text-pretty"
                data-sal="fade"
                data-sal-duration="2000"
              >
                A love journey ideally continues to evolve over time, with the
                couple navigating lifes ups and downs together. Maintaining love
                and passion requires ongoing effort, communication, and a
                commitment to each others happiness and well-being. Celebrating
                milestones, cherishing memories, and facing challenges as a team
                are essential aspects of a lasting love journey.
              </span>
              <span
                className="mt-12 text-4xl text-white roboto-light"
                data-sal="fade"
                data-sal-duration="2000"
              >
                Wedding Reception
              </span>
              <span
                className="mt-5 text-sm text-white"
                data-sal="fade"
                data-sal-duration="2000"
              >
                {/* harus dari env */}
                Sunday, 14 July 2024
                <br />
                at 08.00 AM
              </span>
              <span
                className="mt-5 text-sm text-white roboto-medium"
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
                  Direct Me
                </span>
              </Link>
            </div>

            {/* section dresscode */}
            <div className={`container max-w-screen-sm  flex flex-col px-10`}>
              <span
                className="mt-8 text-4xl text-white roboto-light"
                data-sal="fade"
                data-sal-duration="2000"
              >
                Our Ambient Color
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
                Kindly Confirm Your Presence and Share Your Blessings
              </span>
              <span
                className="mt-5 text-sm text-white"
                data-sal="fade"
                data-sal-duration="2000"
              >
                Loving and caring have become the vows we pledge to uphold
                throughout our lives. Thank you for witnessing our commitment
                and the prayers you’ve bestowed on our joyful day
              </span>
              <form
                onSubmit={handleMessage}
                className="flex flex-col mt-8"
                data-sal="fade"
                data-sal-duration="2000"
              >
                <span className="text-sm text-white">Name</span>
                <input
                  name="name"
                  className="form"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span className="mt-3 text-sm text-white">Message</span>
                <textarea
                  name="message"
                  className="mt-1 form"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <span className="mt-3 text-sm text-white">Attendance</span>
                <select
                  name="attendance"
                  className="mt-1 form select-form"
                  onChange={(e) => setAttendance(e.target.value)}
                >
                  <option value="" selected={attendance === "" ? true : false}>
                    Attendance
                  </option>
                  <option value="1">I am Come</option>
                  <option value="0">Sorry, I cannot</option>
                </select>
                <div className="mt-6 mb-10">
                  <button
                    type="submit"
                    className={`px-8 py-1 rounded ${
                      isNull === true
                        ? "pointer-events-none bg-dark-green-disabled text-slate-800"
                        : "pointer-events-auto bg-dark-green text-white"
                    }`}
                  >
                    Submit
                  </button>
                </div>
              </form>
              {dataMessage.length > 0 && (
                <>
                  <span className="mt-2 text-2xl text-white roboto-light">
                    Greetings from Guest
                  </span>
                  <div className="mt-4 mb-5 overflow-scroll max-h-[300px] flex gap-4 flex-col">
                    {dataMessage.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col p-4 bg-black rounded-md bg-opacity-60"
                      >
                        <span className="text-sm border-b-[1px] pb-2 mb-2 text-dark-green border-dark-green roboto-medium">
                          From {item.name} {" - "}{" "}
                          <span className="roboto-light">
                            {item.attendance === 1
                              ? "I'm Come"
                              : "Sorry, I cannot"}
                          </span>
                        </span>
                        <span className="text-sm text-dark-green roboto-medium-italic">
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
              className={`container max-w-screen-sm  flex flex-col justify-center px-10`}
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
                  Wedding <br />
                  Gift
                </span>
              </div>
              <span
                className="mt-5 text-sm text-white text-pretty"
                data-sal="fade"
                data-sal-duration="2000"
              >
                Even we cannot express in words how fortunate we are to have
                someone so wise and kind-hearted in our lives!
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
                Our Engagement / Prewedding Celebration
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
                  >
                    <source src={videoCouple}></source>
                  </video>
                </div>
                <div className="flex flex-row w-full">
                  <img
                    src={galler1}
                    className="h-[215px] w-full object-cover"
                    data-sal="zoom-out"
                    data-sal-duration="2000"
                    loading="lazy"
                  />
                  <img
                    src={galler2}
                    className="h-[215px] w-full object-cover"
                    data-sal="zoom-out"
                    data-sal-duration="2000"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-row w-full">
                  <img
                    src={galler3}
                    className="h-[195px] w-full object-cover"
                    data-sal="zoom-out"
                    data-sal-duration="2000"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-row w-full">
                  <img
                    src={galler4}
                    className="h-[215px] w-full object-cover"
                    data-sal="zoom-out"
                    data-sal-duration="2000"
                    loading="lazy"
                  />
                  <img
                    src={galler5}
                    className="h-[215px] w-full object-cover"
                    data-sal="zoom-out"
                    data-sal-duration="2000"
                    loading="lazy"
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
              >
                Thank you
                <br />
                for your attendance
                <br />
                and support
              </span>
              <span
                className="mt-4 text-sm leading-6 text-white text-pretty roboto-light"
                data-sal="fade"
                data-sal-duration="2000"
              >
                It is an honor and joy for us if you would kindly attend to give
                your blessings to the couple
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
        <button onClick={toggleSound} className={`${style.buttonMusic}`}>
          {playing ? iconMusicPlay : iconMusicPause}
        </button>
      </div>
    </>
  );
};

export default Main;
