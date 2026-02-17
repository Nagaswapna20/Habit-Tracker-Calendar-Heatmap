const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
let currentDate = new Date();
let habitData = JSON.parse(localStorage.getItem("habitData")) || {};
const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function formatDate(year, month, day) {
    month = String(month).padStart(2, "0");
    day = String(day).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
function renderCalendar() {
    calendar.innerHTML = "";
    // Add day names
    daysOfWeek.forEach(day => {
        const div = document.createElement("div");
        div.className = "day-name";
        div.textContent = day;
        calendar.appendChild(div);
    });
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthYear.textContent =
        currentDate.toLocaleString("default", { month: "long" }) +
        " " + year;

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        empty.className = "day empty";
        calendar.appendChild(empty);
    }
    // Actual days
    for (let day = 1; day <= totalDays; day++) {
        const dateKey = formatDate(year, month + 1, day);
        const level = habitData[dateKey] || 0;
        const div = document.createElement("div");
        div.className = `day level-${level}`;
        div.textContent = day;

        div.addEventListener("click", () => {
            habitData[dateKey] = (habitData[dateKey] || 0) + 1;
            if (habitData[dateKey] > 4) habitData[dateKey] = 0;
            localStorage.setItem("habitData", JSON.stringify(habitData));
            renderCalendar();
        });

        calendar.appendChild(div);
    }
}
function changeMonth(step) {
    currentDate.setMonth(currentDate.getMonth() + step);
    renderCalendar();
}
// Initialize
renderCalendar();
