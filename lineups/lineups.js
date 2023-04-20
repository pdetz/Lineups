function LineUps({meet, roster, selectedColors, selectedEmojis}){
    return e(Div, {css:"#lineups"},
        [0, 2, 4, 6, 8].map(y => {
            return e(Div, {key: y, css:"pair"}, [0, 1].map(x => {
                return e(LineUpTable, {key: x+y, meet, group: roster.groups[x+y], selectedColors, selectedEmojis})
            }))
        })
    );
}

function LineUpTable({meet, group, selectedColors, selectedEmojis}){
    return (
        e('table', {className:"lineup"},
            e('thead', {style:{backgroundColor: selectedColors[0]}}, 
                e('tr', {key:"head", className:"head"}, 
                    e('td', {key:"name", className:"name"}, group.name, e('span', {key:"count", className:"count"}, " (" + group.swimmers.length + ")")),
                    meet.strokes.map(stroke => e('td', {key:stroke}, stroke))
                ),
                e('tr', {key:"events", className:"events"},
                    e('td', {key:"right", className:"right"}, "Event #s — Please learn"),
                    group.eventNumbers.map(n => e('td', {key: n}, n))
                )
            ),
            e('tbody', {style:{backgroundColor: selectedColors[1]}},
                group.swimmers.map(swimmer => SwimmerRow({swimmer, meet, group, selectedEmojis}))
            )
        )
    )
}

function SwimmerRow({swimmer, meet, group, selectedEmojis}) {
    let emojis = meet.strokes.map((stroke, i) => {
        let entry = swimmer.entries.find(en => meet.events[en.event - 1].stroke == i);
        //return entry ? entry.time : '';//selectedEmojis[entry.event == group.eventNumbers[i] ? 0 : 1] : '';
        return entry ? selectedEmojis[entry.event == group.eventNumbers[i] ? 0 : 1] : '';
    });
    return e('tr', {key: swimmer.key}, 
        e('td', {key:"name", className:"name"}, swimmer.display),
        emojis.map((emoji, index) => e('td', {key:index}, emoji)));
}

/*
function LineUps({meet, roster, selectedColors, selectedEmojis}){
    return e(Div, {css:"#lineups flex"}, 
        roster.groups.map((group, n) => e(LineUpTable, {key: n, meet, group, selectedColors, selectedEmojis}))
    );
}
*/