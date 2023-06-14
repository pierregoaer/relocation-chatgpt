import React, {useState} from "react"
import "../styles/styles.css"

export default function Home() {
    const initialPreferences = {
        country: null,
        affordability: null,
        workLifeBalance: null,
        weather: null,
        proximityToNature: null
    }

    const [preferences, setPreferences] = useState(initialPreferences)

    const [currentSection, setCurrentSection] = useState(0)
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

    console.log(currentSection)
    console.log(preferences)

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
                        <button name="null" onClick={handleBtnClick}>No Preference</button>
                        <input type="text" name="country" placeholder="Type a country"/>
                    </form>
                </section>
            </div>
            <div className="slider-dots">
                {dotsElements}
            </div>
        </div>
    )
}
