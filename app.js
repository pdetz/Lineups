const e = React.createElement;

function App(){
    const meet = new Meet();
    const [roster, setRoster] = React.useState(demoRoster(meet.ageGroups));

    const r = random();
    const [selectedEmojis, setSelectedEmojis] = React.useState([EMOJIS[r], EMOJIS[(r + random(1)) % EMOJIS.length]]);
    const [selectedColors, setSelectedColors] = React.useState([HEADERS[random(0, 7)], ROWS[random(0, 7)]]);
    const [title, setTitle] = React.useState("Click here to edit the title");
    const [instructions, setInstructions] = React.useState('');

    function handleTitleChange(event){ setTitle(event.target.value) }

    function handleRosterLoad(uploadedFiles){
        let newRoster = new Roster(meet.ageGroups);
        let newTitle = uploadedFiles[0].split("\nC1")[1].slice(5, 35).trim() + " Roster";
        uploadedFiles.forEach(file => {    
            let titleSplit = file.split("\nB1");
            if (titleSplit.length > 1) newTitle = titleSplit[1].slice(0, 45).trim();

            let athletes = file.split("\nD1");
            athletes.slice(1).forEach(
                athlete => newRoster.addSwimmer(new Swimmer(athlete))
            );
        });
        setRoster(newRoster.alphabetize());
        setTitle(newTitle);
        setInstructions(' hide');
    }

    function handlePickerClick(selectedArray, i, item, setter){
        if (item != selectedArray[i]) {
            let newItems = [...selectedArray];
            newItems[i] = item;
            setter(newItems);
        }
    }

    const [scaleFactor, setScaleFactor] = React.useState([1, "auto"]);
    React.useEffect(() => {
        function handleResize() {
            const displayArea = document.querySelector('#displayArea');
            const documentView = document.querySelector('#documentView');
            console.log(displayArea.clientHeight,documentView.clientHeight);
            
            const width = window.innerWidth;
            const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const newScaleFactor = width / fontSize < 50 ?
                (width - 2 * fontSize) / (48 * fontSize) : 
                    width / fontSize < 73 ?
                        (width - 25 * fontSize) / (48 * fontSize) : 1;
            const newHeight = document.querySelector('#displayArea').clientHeight * newScaleFactor + "px";
            setScaleFactor([newScaleFactor, newHeight]);
        }
    
        window.addEventListener("resize", handleResize);
        handleResize(); // Call the function once to set the initial scale factor
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    return e(Div, {key: "view", id: "view" },
            e(Div, {key: "documentView", css:"#documentView scrollLeft"},
                e(Div, {key: "resize", css:"resize", style:{height: scaleFactor[1]}},
                e(Div, {key: "displayArea", css:"#displayArea", style:{transform: `scale(${scaleFactor[0]})`, transformOrigin:"top right"}}, 
                    e("input", {className: "title", value: title, onChange: handleTitleChange }),
                    e(LineUps, {key: "lineups", meet, roster, selectedColors, selectedEmojis})
                )
                )
                //e(Welcome, {selectedEmojis, handleRosterLoad, instructions} ),
            ),
            e(Div, {key: "sidebar", css:"#sidebar noprint"},
                e(Div, {key: "tools", css:"#tools"},
                    e(ColorPicker, {colorRows: [HEADERS, ROWS], selectedColors, onColorClick: handlePickerClick, setSelectedColors}),
                    e(EmojiPicker, {emojis: EMOJIS, selectedEmojis, selectedColors, onEmojiClick: handlePickerClick, setSelectedEmojis}),
                    e(Div, {key: "fileprint", css: "buttonbar"},
                        e(FileInputButton, {text:"📄 Files", onLoad: handleRosterLoad, selectedColors}),
                        e(ToolButton, {id: "print", onClick: window.print, selectedColors}, "🖨️ Print")
                    ),
                    e(Info, {key:"info", css:"info"})
                )
            ),
        )
}

function Welcome({selectedEmojis, handleRosterLoad, instructions}) {
return e(Div, {css: "#welcome" + instructions}, "Welcome to Emoji Line Ups for MCSL!",
    e(Div, {css: "instructions"},
        e("p", null, 'Emoji Line Ups is a web app that allows MCSL coaches and teams to produce fun, colorful, and easy-to-read line ups for standard A and B meets. ' + 
            'It helps parents and swimmers see their meet events and learn their event numbers. It helps coaches quickly and easily answer 2 common questions — "What am I swimming?" and "What number is my event?" — ' +
            'without having to search through pages of text.'),
        e("p", null, "To get started, click on the ",
            e(FileInputButton, {text:"📄 Upload Meet Files", onLoad: handleRosterLoad, css: " inst"}),
            " button to upload your team's HY3 files. There are 3 options:"),
        e("ol", {className:"options"},
            e("li", {className: "options"}, "Upload your Roster file to produce a list of all of your teams's swimmers with no emojis or meet entry information."),
            e("li", {className: "options"}, "Upload your Meet Entries file to produce a list of only the swimmers who are swimming in the meet, along with emojis to mark their events."),
            e("li", {className: "options"}, "Upload both your Roster and Meet Entries by selecting both files in the window where you choose which files to upload. " +
                "This will produce a list of all of your team's swimmers, but only those swimming in the meet will have emojis marking their events."),
        ),
        e("p", null, "In this format, your swimmers are listed alphabetically by age group. Meet entries are indicated by emojis."),
        e("p", {className: "indent"}, "Regular age group entries are indicated by the " + selectedEmojis[0] + " emoji."),
        e("p", {className: "indent"}, "Swim ups are indicated by the " + selectedEmojis[1] + " emoji. \n"),
        e("p", null, "Click on the square buttons to choose colors and emojis that suit your team."),
        e("p", null, "Click on the title and type to edit the title of your document."),
        e("p", null, "When your line ups are ready, click the ",
            e(ToolButton, {css: ' inst', onClick: window.print}, "🖨️ Print"),
            " button. From the print window, you can save the file as a PDF or print hard copies."
        ),
    )
);
}

function Info({css}) {
    return e(Div, {key: "info", css:css, dangerouslySetInnerHTML:{__html: 
        "<div id='about-btn'> About </div>" +
        "<div id='copyright'> © 2023 Patrick Detzner </div>"
    }})
}

function Div({css='', ...props}) {
    let idClassName = {};
    css.split(" ").forEach(c => {
        if (c.charAt(0) == "#") idClassName.id = c.substring(1);
        else idClassName.className = idClassName.className ? idClassName.className + " " + c : c;
    });
    return e('div', {...props, ...idClassName});
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));