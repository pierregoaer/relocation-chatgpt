import React, {useState} from "react"
import "../styles/styles.css"
import axios from "axios";

function Section({
                     section,
                     sectionIndex,
                     goToNext,
                     handleBtnClick,
                     handleEnter,
                     sectionsNumber,
                     currentSection,
                     inputChange,
                     preferences
                 }) {
    const sectionName = section.name
    if (section.type === "input") {
        return (
            <section style={{transform: `translateY(${100 * (1 + sectionIndex - currentSection)}%)`}}>
                <h2>{section.displayName.toUpperCase()}</h2>
                <p>{`If you have a ${section.displayName} preference, type it here. If not, leave it blank.`}</p>
                <form className="section-options" name={sectionName} onSubmit={e => handleEnter(e)}>
                    <input type="text"
                           name={sectionName}
                           placeholder={`Type a ${section.displayName}`}
                           onChange={inputChange}
                        // className={preferences.sectionName !== "null" && preferences.section.name.length > 0 ? "option-selected" : ""}
                        // value={preferences.section.name === "null" ? "" : preferences.section.name}
                    />
                </form>
            </section>
        )
    }
    if (section.type === "select") {
        return (
            <section style={{transform: `translateY(${100 * (1 + sectionIndex - currentSection)}%)`}}>
                <h2>{section.displayName.toUpperCase()}</h2>
                <p>{`How important is ${section.displayName} to you?`}</p>
                <form className="section-options" name={sectionName} onClick={goToNext}>
                    <button name="not important" onClick={handleBtnClick}
                            className={preferences[sectionName] === "not important" ? "option-selected" : ""}>Not
                        Important at All
                    </button>
                    <button name="a little important" onClick={handleBtnClick}
                            className={preferences[sectionName] === "a little important" ? "option-selected" : ""}>A
                        Little Important
                    </button>
                    <button name="doesn't matter" onClick={handleBtnClick}
                            className={preferences[sectionName] === "doesn't matter" ? "option-selected" : ""}>Doesn't
                        Matter
                    </button>
                    <button name="quite important" onClick={handleBtnClick}
                            className={preferences[sectionName] === "quite important" ? "option-selected" : ""}>Quite
                        Important
                    </button>
                    <button name="very important" onClick={handleBtnClick}
                            className={preferences[sectionName] === "very important" ? "option-selected" : ""}>Very
                        Important
                    </button>
                </form>
            </section>
        )
    }
}

export default function Home() {
    const initialPreferences = {
        location: "doesn't matter",
        language: "doesn't matter",
        affordability: null,
        workLifeBalance: null,
        weather: null,
        proximityToNature: null,
        anythingElse: "no additional info"
    }

    const [preferences, setPreferences] = useState(initialPreferences)
    const [currentSection, setCurrentSection] = useState(0)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [results, setResults] = useState(null)
    const [resultsReceived, setResultsReceived] = useState(false)
    const sections = [
        {
            type: "input",
            name: "location",
            displayName: "location"
        },
        {
            type: "input",
            name: "language",
            displayName: "language"
        },
        {
            type: "select",
            name: "affordability",
            displayName: "affordability"
        },
        {
            type: "select",
            name: "workLifeBalance",
            displayName: "work life balance"
        },
        {
            type: "select",
            name: "weather",
            displayName: "weather"
        },
        {
            type: "select",
            name: "proximityToNature",
            displayName: "proximity to nature"
        },
        {
            type: "input",
            name: "anythingelse",
            displayName: "anything else"
        },
    ]

    const sectionsElements = sections.map((section, index) => (
            <Section
                key={index}
                section={section}
                sectionIndex={index}
                sectionsNumber={sections.length}
                goToNext={goToNext}
                handleBtnClick={handleBtnClick}
                handleEnter={handleEnter}
                currentSection={currentSection}
                inputChange={inputChange}
                preferences={preferences}
            />
        )
    )

    let dotsElements = []

    function createDots() {
        for (let i = 0; i < sections.length + 2; i++) {
            const newDot = (
                <div
                    key={i}
                    className="slider-dot"
                    onClick={() => goToSlide(i)}
                    style={i === currentSection ? {backgroundColor: 'var(--primary-accent-color)'} : {backgroundColor: 'var(--primary-accent-color-transparent)'}}
                >
                </div>
            )
            dotsElements.push(newDot)
        }
    }

    createDots()

    function goToSlide(slideIndex) {
        setCurrentSection(slideIndex);
    }

    function goToNext() {
        setCurrentSection(prevSection => prevSection + 1)
    }

    function goToPrevious() {
        setCurrentSection(prevSection => prevSection - 1)
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

    function handleEnter(e) {
        e.preventDefault()
        goToNext()
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
            setResultsReceived(true)
            setResults(response.data.message)
        } catch (error) {
            console.error(error);
            window.alert("Something went wrong, please try again!")
        }
        setIsSubmitted(false)
    }

    function handleRestart() {
        goToSlide(0)
        setResults(null)
    }

    console.log(results)
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
                {sectionsElements}
                <section style={{transform: `translateY(${100 * (sections.length + 1 - currentSection)}%)`}}>
                    <h2>Ready to submit</h2>
                    {
                        isSubmitted ?
                            <div className="spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div> :
                            <button onClick={handleSubmit} className="validate-btn">Validate my answers</button>
                    }
                </section>
            </div>
            {!results &&
                <div className="slider-dots">
                    {dotsElements}
                </div>
            }

            {results &&
                <div className="results">
                    {results}
                    <button onClick={handleRestart} className="restart-btn">Restart</button>
                </div>
            }

            {!results && currentSection > 0 && <div className="move-btn move-btn-up" onClick={goToPrevious}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM13 12V16H11V12H8L12 8L16 12H13Z"></path>
                </svg>
            </div>}
            {!results && currentSection < sections.length + 1 &&
                <div className="move-btn move-btn-down" onClick={goToNext}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM13 12H16L12 16L8 12H11V8H13V12Z"></path>
                    </svg>
                </div>}
        </div>
    )
}
