import {refresh} from './utils.js'

export const dateFrom = flatpickr("#date-from", {
  dateFormat: "Y-m-d",

  locale: {
    firstDayOfWeek: 1,
  },

  onChange(_, dateStr) {
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
    toggleDateState("#date-to", !!dateStr);
    refresh();
  }
});

initClearButtons();

function initClearButtons() {
  document.querySelectorAll(".date-select_wrapper").forEach(wrapper => {
    const clearBtn = wrapper.querySelector(".clear-icon");
    const input = wrapper.querySelector("input");

    clearBtn.addEventListener("click", () => {
      input._flatpickr.clear();

      wrapper.classList.remove("has-date");

      refresh();
      });
  });
}


function toggleDateState(selector, hasDate) {
  const wrapper = document.querySelector(selector).closest(".date-select_wrapper");

  wrapper.classList.toggle("has-date", hasDate);
}