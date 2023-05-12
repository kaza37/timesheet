const employees = [];
const vacations = {};
let selectedDate;

function updateDate() {
  const datePicker = document.getElementById('datePicker');
  selectedDate = new Date(datePicker.value);
}

function addEmployee() {
  const employeeList = document.getElementById('employee');
  const newEmployee = {
    rank: prompt('직급을 입력하세요:'),
    name: prompt('이름을 입력하세요:'),
  };
  employees.push(newEmployee);

  employeeList.innerHTML = `<table>
    <tr>
      <th>직급</th>
      <th>이름</th>
    </tr>
    ${employees
      .map(employee => `<tr><td>${employee.rank}</td><td>${employee.name}</td></tr>`)
      .join('')}
  </table>`;
}

function showVacationForm() {
  const vacationForm = document.getElementById('vacation');
  vacationForm.style.display = 'block';

  const select = document.createElement('select');
  employees.forEach((employee, index) => {
    const option = document.createElement('option');
    option.text = `${employee.rank}: ${employee.name}`;
    option.value = index;
    select.add(option);
  });

  vacationForm.innerHTML = '';
  vacationForm.appendChild(select);
  const datepicker = document.createElement('input');
  datepicker.type = 'date';
  datepicker.onchange = e => (vacations[select.value] = new Date(e.target.value));
  vacationForm.appendChild(datepicker);
}

function generateWorkSchedule() {
  let calendar = '<div class="calendar"><table>';
  for (let i = 0; i < employees.length; i++) {
    calendar += `<tr><td>${employees[i].rank}</td>`;
    calendar += `<td>${employees[i].name}</td>`;
    let currentDate = new Date(selectedDate);

    for (let j = 0; j < 30; j++) {
      if (
        currentDate.getDay() !== 0 &&
        currentDate.getDay() !== 6 &&
        !isVacation(currentDate, i)
      ) {
        calendar += `<td>${currentDate.toLocaleDateString()}</td>`;
      } else {
        calendar += `<td>-</td>`;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    calendar += '</tr>';
  }
  calendar += '</table></div>';
  document.getElementById('workSchedule').innerHTML = calendar;
}

function isVacation(currentDate, employeeIdx) {
  const vacationDate = vacations[employeeIdx];
  if (!vacationDate) {
    return false;
  }

  return (
    vacationDate.getFullYear() === currentDate.getFullYear() &&
    vacationDate.getMonth() === currentDate.getMonth() &&
    vacationDate.getDate() === currentDate.getDate()
  );
}
