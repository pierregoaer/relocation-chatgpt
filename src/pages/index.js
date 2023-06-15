import React, {useState} from "react"
import "../styles/styles.css"
import axios from "axios";

export default function Home() {
    const initialPreferences = {
        country: "doesn't matter",
        affordability: null,
        workLifeBalance: null,
        weather: null,
        proximityToNature: null
    }

    const [preferences, setPreferences] = useState(initialPreferences)
    const [currentSection, setCurrentSection] = useState(0)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const slides = ["1", "2", "3", "4", "5", "6"]

    const dotsElements = slides.map((slide, index) => {
        return (
            <div
                key={index}
                className="slider-dot"
                onClick={() => goToSlide(index)}
                style={index === currentSection ? {backgroundColor: 'var(--primary-accent-color)'} : {backgroundColor: 'var(--primary-accent-color-transparent)'}}
            >
            </div>
        )
    })

    function goToSlide(slideIndex) {
        setCurrentSection(slideIndex);
    }

    function goToNext() {
        if (currentSection < slides.length - 1) {
            setCurrentSection(prevSection => prevSection + 1)
        }
    }

    function goToPrevious() {
        if (currentSection > 0) {
            setCurrentSection(prevSection => prevSection - 1)
        }
    }

    function handleBtnClick(e) {
        e.preventDefault()
        const target = e.target
        const section = target.closest("form").name
        setPreferences(prev => (
                {
                    ...prev,
                    [section]: target.name
                }
            )
        )
    }

    function inputChange(e) {
        e.preventDefault()
        const target = e.target
        const section = target.closest("form").name
        setPreferences(prev => (
                {
                    ...prev,
                    [section]: target.value
                }
            )
        )
    }

    function handleInputSubmit(e) {
        e.preventDefault()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitted(true)
        console.log(preferences)
        try {
            const response = await axios.post(
                "http://127.0.0.1:8080",
                preferences
            );
            setIsSubmitted(false)
            setPreferences(initialPreferences)
            window.alert(response.data.message)
            console.log(response.data.message)
        } catch (error) {
            console.error(error);
            window.alert("Something went wrong, please try again!")
        }
        setIsSubmitted(false)
        // setMessageSubmitted(false)

    }


    return (
        <div className="wrapper">
            <div className="container">
                <section style={{transform: `translateY(${100 * (0 - currentSection)}%)`}}>
                    <h1>Welcome to your relocation</h1>
                    <div className="text">
                        <p>Answer a few questions and we'll show your where you move based on your preferences.</p>
                        <p>Let's find you a new place to live in!</p>
                    </div>
                    <button onClick={goToNext}>Let's Start</button>
                </section>
                <section style={{transform: `translateY(${100 * (1 - currentSection)}%)`}}>
                    <h2>AFFORDABILITY</h2>
                    <p>Are important is affordability to you?</p>
                    <form className="section-options" name="affordability" onClick={goToNext}>
                        <button name="not important" onClick={handleBtnClick}
                                className={preferences.affordability === "not important" ? "option-selected" : ""}>Not
                            Important at All
                        </button>
                        <button name="a little important" onClick={handleBtnClick}
                                className={preferences.affordability === "a little important" ? "option-selected" : ""}>A
                            Little Important
                        </button>
                        <button name="doesn't matter" onClick={handleBtnClick}
                                className={preferences.affordability === "doesn't matter" ? "option-selected" : ""}>Doesn't
                            Matter
                        </button>
                        <button name="quite important" onClick={handleBtnClick}
                                className={preferences.affordability === "quite important" ? "option-selected" : ""}>Quite
                            Important
                        </button>
                        <button name="very important" onClick={handleBtnClick}
                                className={preferences.affordability === "very important" ? "option-selected" : ""}>Very
                            Important
                        </button>
                    </form>
                </section>
                <section style={{transform: `translateY(${100 * (2 - currentSection)}%)`}}>
                    <h2>WORK-LIFE BALANCE</h2>
                    <p>Are important is work-life balance to you?</p>
                    <form className="section-options" name="workLifeBalance" onClick={goToNext}>
                        <button name="not important" onClick={handleBtnClick}
                                className={preferences.workLifeBalance === "not important" ? "option-selected" : ""}>Not
                            Important at All
                        </button>
                        <button name="a little important" onClick={handleBtnClick}
                                className={preferences.workLifeBalance === "a little important" ? "option-selected" : ""}>A
                            Little Important
                        </button>
                        <button name="doesn't matter" onClick={handleBtnClick}
                                className={preferences.workLifeBalance === "doesn't matter" ? "option-selected" : ""}>Doesn't
                            Matter
                        </button>
                        <button name="quite important" onClick={handleBtnClick}
                                className={preferences.workLifeBalance === "quite important" ? "option-selected" : ""}>Quite
                            Important
                        </button>
                        <button name="very important" onClick={handleBtnClick}
                                className={preferences.workLifeBalance === "very important" ? "option-selected" : ""}>Very
                            Important
                        </button>
                    </form>
                </section>
                <section style={{transform: `translateY(${100 * (3 - currentSection)}%)`}}>
                    <h2>PROXIMITY TO NATURE</h2>
                    <p>Are important is it that for you to be close to nature?</p>
                    <form className="section-options" name="proximityToNature" onClick={goToNext}>
                        <button name="not important" onClick={handleBtnClick}
                                className={preferences.proximityToNature === "not important" ? "option-selected" : ""}>Not
                            Important at All
                        </button>
                        <button name="a little important" onClick={handleBtnClick}
                                className={preferences.proximityToNature === "a little important" ? "option-selected" : ""}>A
                            Little Important
                        </button>
                        <button name="doesn't matter" onClick={handleBtnClick}
                                className={preferences.proximityToNature === "doesn't matter" ? "option-selected" : ""}>Doesn't
                            Matter
                        </button>
                        <button name="quite important" onClick={handleBtnClick}
                                className={preferences.proximityToNature === "quite important" ? "option-selected" : ""}>Quite
                            Important
                        </button>
                        <button name="very important" onClick={handleBtnClick}
                                className={preferences.proximityToNature === "very important" ? "option-selected" : ""}>Very
                            Important
                        </button>
                    </form>
                </section>
                <section style={{transform: `translateY(${100 * (4 - currentSection)}%)`}}>
                    <h2>WEATHER</h2>
                    <p>Is having nice weather important to you?</p>
                    <form className="section-options" name="weather" onClick={goToNext}>
                        <button name="not important" onClick={handleBtnClick}
                                className={preferences.weather === "not important" ? "option-selected" : ""}>Not
                            Important at All
                        </button>
                        <button name="a little important" onClick={handleBtnClick}
                                className={preferences.weather === "a little important" ? "option-selected" : ""}>A
                            Little Important
                        </button>
                        <button name="doesn't matter" onClick={handleBtnClick}
                                className={preferences.weather === "doesn't matter" ? "option-selected" : ""}>Doesn't
                            Matter
                        </button>
                        <button name="quite important" onClick={handleBtnClick}
                                className={preferences.weather === "quite important" ? "option-selected" : ""}>Quite
                            Important
                        </button>
                        <button name="very important" onClick={handleBtnClick}
                                className={preferences.weather === "very important" ? "option-selected" : ""}>Very
                            Important
                        </button>
                    </form>
                </section>
                <section style={{transform: `translateY(${100 * (5 - currentSection)}%)`}}>
                    <h2>COUNTRY</h2>
                    <p>Do you have a country preference?</p>
                    <form className="section-options" name="country">
                        <button name="doesn't matter" onClick={handleBtnClick}
                                className={preferences.country === "doesn't matter" ? "option-selected" : ""}>No
                            Preference
                        </button>
                        <input type="text"
                               name="country"
                               placeholder="Type a country"
                               onChange={inputChange}
                               onSubmit={handleInputSubmit}
                               className={preferences.country !== "null" && preferences.country.length > 0 ? "option-selected" : ""}
                               value={preferences.country === "null" ? "" : preferences.country}
                        />
                    </form>
                    {
                        isSubmitted ?
                            <div className="spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div> :
                            <button onClick={handleSubmit} className="validate-btn">Validate answers</button>
                    }
                </section>
            </div>
            <div className="slider-dots">
                {dotsElements}
            </div>

            {currentSection > 0 && <div className="move-btn move-btn-up" onClick={goToPrevious}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM13 12V16H11V12H8L12 8L16 12H13Z"></path>
                </svg>
            </div>}
            {currentSection < slides.length - 1 && <div className="move-btn move-btn-down" onClick={goToNext}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM13 12H16L12 16L8 12H11V8H13V12Z"></path>
                </svg>
            </div>}
        </div>
    )
}
