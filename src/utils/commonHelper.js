const moment = require("moment");

module.exports.generateOtp = () => {
  // return Math.floor(100000 + Math.random() * 900000).toString(); 
  return "123456";
};


module.exports.generateInvoiceNumber = () => {
  const invoiceNumber = Math.floor(1000 + Math.random() * 9000).toString();
  return `#INV-${invoiceNumber}`
};


module.exports.timeInAMPM = (date) => {
  if (!(date instanceof Date) || isNaN(date)) return "Invalid Time";
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

// module.exports.timeInISTAMPM = (date) => {
//   if (!(date instanceof Date) || isNaN(date)) return "Invalid Time";
//   return new Intl.DateTimeFormat('en-IN', {
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true,
//     timeZone: 'Asia/Kolkata'
//   }).format(date);
// };


// timeInUTCAMPM
module.exports.timeInISTAMPM = (date) => {
  if (!date) return "Invalid Time";

  const parsedDate = date instanceof Date ? date : new Date(date);
  if (isNaN(parsedDate)) return "Invalid Time";

  const formatted = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  }).format(parsedDate);

  return formatted.toUpperCase();
};






module.exports.getDateInSlash = (req) => {
  const newDate = new Date(req);
  const getDate = newDate.getDate().toString().padStart(2, "0");
  const getMonth = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const getFullYear = newDate.getFullYear();
  // const slashDateFormate = `${getDate}/${getMonth}/${getFullYear}`;
  const slashDateFormate = `${getFullYear}-${getMonth}-${getDate}`;
  //2025-10-06
  return slashDateFormate;
}


module.exports.getDateWithMonthName = (date) => {
  const newDate = new Date(date);

  const day = newDate.getDate();
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthName = monthNames[newDate.getMonth()];
  const year = newDate.getFullYear();

  return `${day} ${monthName}, ${year}`;
};


module.exports.parseTime = (dateStr, timeStr) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const date = new Date(dateStr);
  date.setHours(hours, minutes, 0, 0);
  return date;
}




module.exports.calculateWorkingHours = (clockIn, clockOut, breakIn, breakOut) => {
  // Convert to moment objects
  let inTime = moment(clockIn, "hh:mm a");
  let outTime = moment(clockOut, "hh:mm a");

  // Agar outTime next day hai
  if (outTime.isBefore(inTime)) {
    outTime.add(1, "day");
  }

  // Total working duration
  let totalDuration = moment.duration(outTime.diff(inTime));

  // Break duration
  let breakStart = moment(breakIn, "hh:mm a");
  let breakEnd = moment(breakOut, "hh:mm a");

  if (breakEnd.isBefore(breakStart)) {
    breakEnd.add(1, "day");
  }

  let breakDuration = moment.duration(breakEnd.diff(breakStart));

  // Final working duration
  let workingDuration = totalDuration.subtract(breakDuration);

  let hours = Math.floor(workingDuration.asHours());
  let minutes = workingDuration.minutes();

  return `${hours}h ${minutes}m`;
}



module.exports.convertTo24Hour = (timeStr) => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours, 10);

  if (modifier.toUpperCase() === 'PM' && hours !== 12) hours += 12;
  if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

