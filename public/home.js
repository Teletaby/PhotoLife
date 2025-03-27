const groupsData = {
    UNIS: [
        { img: "resources/elisia.jpg", name: "Elisia" },
        { img: "resources/gehlee.jpg", name: "Gehlee" },
        { img: "resources/kotoko.jpg", name: "Kotoko" },
        { img: "resources/hyeonju.jpeg", name: "Hyeonju" },
        { img: "resources/seawon.jpeg", name: "Seawon" },
        { img: "resources/yoona.jpg", name: "Yoona" },
        { img: "resources/nana.jpg", name: "Nana" },
        { img: "resources/yunha.jpg", name: "Yunha" },
        { img: "resources/PhotoLife.png", class: "none" },
        { img: "resources/Photolife.png", class: "none"}

    ],
    LE_SSERAFIM: [
        { img: "resources/sakura.jpg", name: "Sakura" },
        { img: "resources/kazuha.jpg", name: "Kazuha" },
        { img: "resources/eunchae.jpg", name: "Eunchae" },
        { img: "resources/yunjin.jpg", name: "Yunjin" },
        { img: "resources/chaewon.jpg", name: "Chaewon" }
    ],
    AESPA: [
        { img: "resources/karina.jpg", name: "Karina" },
        { img: "resources/winter.jpg", name: "Winter" },
        { img: "resources/giselle.jpg", name: "Giselle" },
        { img: "resources/ningning.jpg", name: "Ningning" },
        { img: "resources/PhotoLife.png", name: "Placeholder", class: "none" }
    ]
};

// Default group
let currentGroup = "UNIS";

function changeGroup(groupName) {
    currentGroup = groupName;

    // Get table body
    const table = document.querySelector("table tbody");
    table.innerHTML = ""; // Clear existing rows

    // Generate new rows based on group
    let row = document.createElement("tr");
    groupsData[groupName].forEach((member, index) => {
        let cell = document.createElement("td");

        let img = document.createElement("img");
        img.src = member.img;
        img.alt = member.name;
        if (member.class) img.classList.add(member.class); // Apply class if any

        let desc = document.createElement("div");
        desc.classList.add("desc");
        desc.textContent = member.name;

        // Add different behavior on click
        img.addEventListener("click", () => imageClickHandler(member.name));

        cell.appendChild(img);
        cell.appendChild(desc);
        row.appendChild(cell);

        // Create a new row every 5 images
        if ((index + 1) % 5 === 0) {
            table.appendChild(row);
            row = document.createElement("tr");
        }
    });

    // Append last row
    if (row.childElementCount > 0) {
        table.appendChild(row);
    }
}

// Function for image click actions
function imageClickHandler(name) {
    if (currentGroup === "UNIS") {
        alert(`You clicked on ${name} from UNIS`);
    } else if (currentGroup === "LE_SSERAFIM") {
        alert(`You clicked on ${name} from LE SSERAFIM`);
    } else if (currentGroup === "AESPA") {
        alert(`You clicked on ${name} from AESPA`);
    } else {
        alert(`You clicked on ${name}`);
    }
}

// Load default group
document.addEventListener("DOMContentLoaded", () => changeGroup("UNIS"));
