import { refresh } from "./utils.js";

export const dateFrom = flatpickr("#date-from", {
  dateFormat: "Y-m-d",
  onChange() {
    refresh();
  }
});

export const dateTo = flatpickr("#date-to", {
  dateFormat: "Y-m-d",
  onChange() {
    refresh();
  }
});