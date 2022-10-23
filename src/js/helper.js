import { Screen, date } from "quasar";
const modules = {};
const formatDateId = {
  days: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", " Sabtu"],
  daysShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", " Sab"],
  months: [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ],
  monthsShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agt",
    "Sept",
    "Okt",
    "Nov",
    "Des",
  ],
};

modules.formatDate = (newDate) => {
  return date.formatDate(
    new Date(newDate),
    Screen.lt.sm ? "DD MMM YYYY" : "DD MMMM YYYY",
    formatDateId
  );
};

export default modules;
