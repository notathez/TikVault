import { currentList, setDateFrom, setDateTo } from './state.js';
import {refresh} from './utils.js'

export const dateFrom = flatpickr("#date-from", {
  dateFormat: "Y-m-d",

  locale: {
    firstDayOfWeek: 1,
  },

  onChange(_, dateStr) {
    setDateFrom(dateStr || null);
    toggleDateState("#date-from", !!dateStr);
    refresh();
  }
});

export const dateTo = flatpickr("#date-to", {
  dateFormat: "Y-m-d",

  locale: {
    firstDayOfWeek: 1,
  },

  onChange(_, dateStr) {
    setDateTo(dateStr || null);
    toggleDateState("#date-to", !!dateStr);
    refresh();
  }
});

export function updateDateUI() {
  dateFrom.setDate(currentList().dateFrom, false);
  dateTo.setDate(currentList().dateTo, false);

  toggleDateState("#date-from", !!currentList().dateFrom);
  toggleDateState("#date-to", !!currentList().dateTo);
}

initClearButtons();

function initClearButtons() {
  document.querySelectorAll(".date-select_wrapper").forEach(wrapper => {
    const clearBtn = wrapper.querySelector(".clear-icon");
    const input = wrapper.querySelector("input");

    clearBtn.addEventListener("click", () => {
      if (input.id == "date-from") {
        setDateFrom(null);
      } else {
        setDateTo(null);
      }

      wrapper.classList.remove("has-date");

      refresh();
      });
  });
}


function toggleDateState(selector, hasDate) {
  const wrapper = document.querySelector(selector).closest(".date-select_wrapper");

  wrapper.classList.toggle("has-date", hasDate);
}

export function initDateFilter() {
  updateDateUI();
}