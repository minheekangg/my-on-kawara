import moment from "moment";

export const calculateDays = (start, end) => {
        var dates = [];

        var currDate = moment(start, "MM/DD/YYYY").startOf('day');
        var lastDate = moment(end, "MM/DD/YYYY").startOf('day');
        dates.push(currDate.clone().format("MM/DD/YYYY"))

        while (currDate.add(1, 'days').diff(lastDate) <= 0) {
            dates.push(currDate.clone().format("MM/DD/YYYY"));
        }

        return dates;

};
