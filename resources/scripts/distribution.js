// *****************************************
//      DISTRIBUTION, INPUT & OUTPUT
// *****************************************


const leadPrio = [
  "ESTJ",
  "ISTJ",
  "ENTJ",
  "INTJ",
  "ENTP",
  "INTP",
  "ESFJ",
  "ENFJ",
  "ISFJ",
  "INFJ",
  "ENFP",
  "ESTP",
  "ISTP",
  "INFP",
  "ISFP",
  "ESFP",
];

const confPrio = ["ENFP", "ESTP", "ISTP", "INFP", "ISFP", "ESFP"];

const anPrio = [
  ["ENFJ", "ENFP"],
  ["ENTJ", "ENTP"],
  ["INFJ", "INFP"],
  ["INTJ", "INTP"],
];

const progPrio = [
  "ISTJ",
  "INTJ",
  "ESTJ",
  "ISTP",
  "ESTP",
  "ISFJ",
  "ESFJ",
  "ISFP",
  "ESFP",
];

const desPrio = [
  ["INTJ", "INTP", "ENTJ", "ENTP"],
  ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
  "ISTP",
  ["INFJ", "INFP", "ENFJ", "ENFP", "ISFP", "ESTP", "ESFP"],
];

const txt2 = document.getElementById("group");
const btn1 = document.getElementById("btn1");
const out1 = document.getElementById("output1");

 let inputValues = ["User1 ENFP","User2 INTP","User3 ENFJ","User4 ENFJ","User5 ENTJ","User6 ENFJ","User7 ISFJ","User8 ENFP","User9 ENFP","User10 ENTJ","User11 ISFJ","User12 ESFJ","User13 ENTP","User14 ESTJ","User15 ESTJ","User16 ESFJ","User17 INTP","User18 ENFP","User19 INFJ","User20 ISFP","User21 INFP","User22 ESFJ","User23 ISTP","User24 ESFJ","User25 ISTJ","User26 ENTJ","User27 ENFP","User28 ISFJ","User29 ESTJ","User30 INTJ","User31 ENFP","User32 ESTP","User33 ESFJ","User34 ESFJ","User35 ENTP","User36 ENFJ","User37 ENTP","User38 INTP","User39 INTP","User40 ISFP","User41 ISFP","User42 INTP","User43 INTJ","User44 ISTJ","User45 INTP","User46 INTJ","User47 ENTP","User48 ENTJ","User49 ESFJ","User50 ISFJ"];
// let inputValues = [];

let userList = [];
let leaders = [];
let designers = [];
let analysts = [];
let programmers = [];
let groups = [];
let anCon = [];
let progCon = [];
let desCon = [];
let cons = [];
let container = [];
let rems = [];
let userCount = 0;
let groupCount = 0;
let memCount = 0;
let subCount = 0;
let sgCount = 0;
let anCount = 0;
let progCount = 0;
let desCount = 0;
let leadCount = 0;

function resetVariables() {
  userList = [];
  leaders = [];
  designers = [];
  analysts = [];
  programmers = [];
  groups = [];
  anCon = [];
  progCon = [];
  desCon = [];
  cons = [];
  container = [];
  rems = [];
  userCount = 0;
  groupCount = 0;
  memCount = 0;
  subCount = 0;
  sgCount = 0;
  anCount = 0;
  progCount = 0;
  desCount = 0;
  leadCount = 0;
}


function conlog(){
  console.log('')
  console.log('start')
  console.log('userCount =', userCount)
  console.log('groupCount = ', groupCount)
  console.log('memCount = ', memCount)
  console.log('subCount = ', subCount)
  console.log('sgCount = ', sgCount)
  console.log('leaders', leaders)
  console.log('userlist', userList)
  console.log('analysts', analysts)
  console.log('programmers', programmers)
  console.log('conflicts', cons)
  console.log('groups', groups)
  console.log('desCon', desCon)
  console.log('remainders', rems)
  console.log('end')
}


// ***********************************
// *     GET INPUT FROM THE BOXES    *
// ***********************************
function storeInput(inputId) {
  const inputValue = document.getElementById(inputId).value.trim(); // Remove leading/trailing whitespace
  if (inputValue !== "") {
    const formattedValue = inputValue + " " + inputId.toUpperCase();
    inputValues.push(formattedValue);
    displayInputValues();
    document.getElementById(inputId).value = ""; // Clear input field after submitting

    // Hide the respective input container
    const inputContainer = document.getElementById(inputId).closest('.mbti-boxes').querySelector('.mbti-type-input');
    inputContainer.classList.remove('active');
    
    console.log(inputValues);
  } else {
    alert("Please enter a value before submitting.");
  }
}

//  ALSO SUBMIT WHEN PRESSED "ENTER"
function handleKeyPress(event, inputId) {
  if (event.key === "Enter") {
    storeInput(inputId);
  }
}




// *****************************************
// *   DISPLAY INPUTS IN THE RIGHT TABLE   *
// *****************************************

function displayInputValues() {
  const tableBody = document.getElementById("inputTableBody");
  tableBody.innerHTML = ""; // Clear previous table content

  inputValues.forEach((value) => {
    const [input, id] = value.split(" ");
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = input;
    row.appendChild(nameCell);

    const typeCell = document.createElement("td");
    typeCell.textContent = id;
    row.appendChild(typeCell);

    tableBody.appendChild(row);
  });
}


// ****************************************************************************
//                    START OF MAIN DISTRIBUTION SYSTEM

function getuserList() {
  const arr1 = inputValues;

  for (index in arr1) {
    let cont = arr1[index].split(" ");
    let user = cont[0];
    let mbti = cont[1];
    userList.push([user, mbti]);
  }

  userCount = userList.length;
  groupCount = txt2.value;
  memCount = Math.floor(userCount / groupCount);
  subCount = Math.floor(memCount / 3);
  sgCount = subCount * groupCount;
  anCount = sgCount;
  progCount = sgCount;
  desCount = sgCount;
  leadCount = groupCount;

  conlog();
}

function getLeader() {
  for (let i of leadPrio) {
    for (let [x, y] of userList) {
      if (y === i && leaders.length < leadCount) {
        let cont1 = [x, y, "Lead Designer / Group Leader"];
        leaders.push(cont1);
      }
    }
  }

  userList = userList.filter(
    (user) =>
      !leaders.some((leader) => leader[0] === user[0] && leader[1] === user[1])
  );
  conlog();
}

function getAnalyst() {
  for (let [i, z] of anPrio) {
    for (let [x, y] of userList) {
      if ((y === i || y === z) && analysts.length < sgCount) {
        let cont1 = [x, y, "Analyst"];
        analysts.push(cont1);
      }
    }
  }

  if (analysts.length < sgCount) {
    for (let [x, y] of userList) {
      if (programmers.length === analysts.length) {
        continue;
      }
      let cont1 = [x, y, "Analyst"];
      analysts.push(cont1);
    }
  }

  userList = userList.filter(
    (user) =>
      !analysts.some(
        (analysts) => analysts[0] === user[0] && analysts[1] === user[1]
      )
  );
  conlog();
}

function getProgrammer() {
  for (let [i] of progPrio) {
    for (let [x, y] of userList) {
      if (i.includes(y) && programmers.length < sgCount) {
        let cont1 = [x, y, "Programmer"];
        programmers.push(cont1);
      }
    }
  }

  progCount = progCount - leaders.length;
  userList = userList.filter(
    (user) => !programmers.some((programmer) => programmer[0] === user[0])
  );

  if (programmers.length < sgCount && programmers.length !== analysts.length) {
    for (let [x, y] of userList) {
      if (programmers.length === analysts.length) {
        continue;
      }
      let cont1 = [x, y, "Programmer"];
      programmers.push(cont1);
    }
  }
  userList = userList.filter(
    (user) =>
      !programmers.some(
        (programmers) =>
          programmers[0] === user[0] && programmers[1] === user[1]
      )
  );
  conlog();
}

function getConflict() {
  for (let con of confPrio) {
    for (let [user, mbti, role] of analysts) {
      if (mbti === con) {
        let cont = [user, mbti, role];
        container.push(cont);
      }
    }
    analysts = analysts.filter(
      (user) => !container.some((x) => x[0] === user[0])
    );

    for (let [user, mbti, role] of programmers) {
      if (mbti === con) {
        let cont = [user, mbti, role];
        container.push(cont);
      }
    }
    programmers = programmers.filter(
      (user) => !container.some((x) => x[0] === user[0])
    );

    for (let [user, mbti] of userList) {
      if (mbti === con) {
        let cont = [user, mbti, "FOR DISTRIBUTION"];
        container.push(cont);
      }
    }
    userList = userList.filter(
      (user) => !container.some((x) => x[0] === user[0])
    );
  }

  // Create a dictionary to group users by MBTI
  let mbti_dict = {};
  for (let user of container) {
    let username = user[0],
      mbti = user[1],
      role = user[2];
    if (mbti in mbti_dict) {
      mbti_dict[mbti].push([username, mbti, role]);
    } else {
      mbti_dict[mbti] = [[username, mbti, role]];
    }
  }
  cons = Object.values(mbti_dict);
  conlog();
}
function distributeLeader() {
  for (let x of leaders) {
    groups.push([x]);
  }

  leaders.length = 0; // Clear the leaders array
  conlog();
}

function getLeadAnalyst() {
  for (let i of leadPrio) {
    for (let user of analysts) {
      let [x, y, z] = user;
      if (y === i && leaders.length < leadCount) {
        let cont1 = [x, y, "Lead Analyst"];
        leaders.push(cont1);
      }
    }
  }

  analysts = analysts.filter(
    (user) => !leaders.some((leader) => leader[0] === user[0])
  );
}

function distributeLeadAnalyst() {
  let length = leaders.length;
  let append = 0;
  let group = 1;

  for (let user of leaders) {
    if (group < groupCount) {
      groups[group - 1].push(user);
      group += 1;
    } else {
      groups[group - 1].push(user);
      group = 0;
    }
    append += 1;
  }

  if (length === append) {
    leaders.length = 0; // Clear the leaders array
  }
  conlog();
}

function getLeadProgrammer() {
  for (let i of leadPrio) {
    for (let user of programmers) {
      let [x, y, z] = user;
      if (y === i && leaders.length < leadCount) {
        let cont1 = [x, y, "Lead Programmer"];
        leaders.push(cont1);
      }
    }
  }

  programmers = programmers.filter(
    (user) => !leaders.some((leader) => leader[0] === user[0])
  );
  conlog();
}

function distributeLeadProgrammer() {
  const length = leaders.length;
  let append = 0;
  let group = 1;

  for (const user of leaders) {
    if (group < groupCount) {
      groups[group - 1].push(user);
      group++;
    } else {
      groups[group - 1].push(user);
      group = 0;
    }
    append++;
  }

  if (length === append) {
    leaders.length = 0; // Clears the leaders array
  }
  conlog();
}

function distributeAnalyst() {
  const length = analysts.length;
  let append = 0;
  let group = 0;

  for (const user of analysts) {
    if (group < groupCount - 1) {
      groups[group].push(user);
      group++;
    } else if (group === groupCount - 1) {
      groups[group].push(user);
      group = 0;
    }
    append++;
  }

  if (length === append) {
    analysts.length = 0; // Clears the analysts array
  }
  conlog();
}
function distributeProgrammer() {
  const length = programmers.length;
  let append = 0;
  let group = 0;

  for (const user of programmers) {
    if (group < groupCount - 1) {
      groups[group].push(user);
      group++;
    } else if (group === groupCount - 1) {
      groups[group].push(user);
      group = 0;
    }
    append++;
  }

  if (length === append) {
    programmers.length = 0; // Clears the programmers array
  }
  conlog();
}

function sortCon() {
  let count = 0;
  let users = 0;

  for (const mbtiGroup of cons) {
    for (const user of mbtiGroup) {
      users++;
      if (user[2] === "Analyst") {
        anCon.push(user);
        count++;
      } else if (user[2] === "Programmer") {
        progCon.push(user);
        count++;
      } else if (user[2] === "FOR DISTRIBUTION") {
        desCon.push(user);
        count++;
      }
    }
  }

  Acount = anCon.length;
  Pcount = progCon.length;
  conlog();
}

function roleCon() {
  let enfp = 0;
  let infp = 0;
  let estp = 0;
  let istp = 0;
  let isfp = 0;
  let esfp = 0;

  // Filter userList to remove users in groups
  userList = userList.map((userList) =>
    userList.filter((user) => !groups.some((group) => group[0] === user[0]))
  );

  userList = userList.filter(
    (user) => !analysts.some((analyst) => analyst[0] === user[0])
  );
  userList = userList.filter(
    (user) => !programmers.some((programmer) => programmer[0] === user[0])
  );

  if (Acount > groupCount) {
    for (const user of anCon) {
      if (user[1] === "ENFP") {
        enfp++;
      } else if (user[1] === "INFP") {
        infp++;
      }
    }
  }

  if (Pcount > groupCount) {
    for (const user of progCon) {
      if (user[1] === "ESTP") {
        estp++;
      } else if (user[1] === "ISTP") {
        istp++;
      } else if (user[1] === "ISFP") {
        isfp++;
      } else if (user[1] === "ESFP") {
        esfp++;
      }
    }
  }

  let enfpCount = enfp;
  let infpCount = infp;
  if (enfpCount > groupCount) {
    for (const [i, z] of anPrio) {
      for (const [x, y] of cons) {
        if (
          (y === i || y === z) &&
          y !== "ENFP" &&
          y !== "INFP" &&
          enfpCount > groupCount
        ) {
          index = enfpCount - 1;
          cont1 = [x, y, "Analyst"];
          anCon.push(cont1);
          anCon.splice(index, 1);
          enfpCount--;
        }
      }
    }

    userList = userList.filter(
      (user) => !analysts.some((analyst) => analyst[0] === user[0])
    );
  }

  if (infpCount > groupCount) {
    for (const [i, z] of anPrio) {
      for (const [x, y] of cons) {
        if (
          (y === i || y === z) &&
          y !== "ENFP" &&
          y !== "INFP" &&
          infpCount > groupCount
        ) {
          const index = infpCount - 1;
          const cont1 = [x, y, "Analyst"];
          anCon.push(cont1);
          anCon.splice(index, 1);
          infpCount--;
        }
      }
    }

    userList = userList.filter(
      (user) => !analysts.some((analyst) => analyst[0] === user[0])
    );
  }

  const estpCount = estp;
  const istpCount = istp;
  const isfpCount = isfp;
  const esfpCount = esfp;

  if (estpCount > groupCount) {
    for (const i of progPrio) {
      for (const [x, y] of cons) {
        if (y === i && y !== "ESTP" && estpCount > groupCount) {
          const index = estpCount - 1;
          const cont1 = [x, y, "Programmer"];
          progCon.push(cont1);
          progCon.splice(index, 1);
          estpCount--;
        }
      }
    }
  }
  if (istpCount > groupCount) {
    for (const i of progPrio) {
      for (const [x, y] of cons) {
        if (y === i && y !== "ESTP" && istpCount > groupCount) {
          const index = istpCount - 1;
          const cont1 = [x, y, "Programmer"];
          progCon.push(cont1);
          progCon.splice(index, 1);
          istpCount--;
        }
      }
    }
  }
  if (isfpCount > groupCount) {
    for (const i of progPrio) {
      for (const [x, y] of cons) {
        if (y === i && y !== "ESTP" && isfpCount > groupCount) {
          const index = isfpCount - 1;
          const cont1 = [x, y, "Programmer"];
          progCon.push(cont1);
          progCon.splice(index, 1);
          isfpCount--;
        }
      }
    }
  }
  if (esfpCount > groupCount) {
    for (const i of progPrio) {
      for (const [x, y] of cons) {
        if (y === i && y !== "ESTP" && esfpCount > groupCount) {
          const index = esfpCount - 1;
          const cont1 = [x, y, "Programmer"];
          progCon.push(cont1);
          progCon.splice(index, 1);
          esfpCount--;
        }
      }
    }
  }

  let filteredCons = [];
  let append = 0;

  for (let mbti = 0; mbti < cons.length; mbti++) {
    //removes anCon users from cons list and appends them to filteredCons
    for (let ind = 0; ind < cons[mbti].length; ind++) {
      append = 0;
      for (let anuser = 0; anuser < anCon.length; anuser++) {
        if (append === 0) {
          if (ind <= anuser) {
            if (cons[mbti][ind] === anCon[anuser]) {
              break;
            } else {
              filteredCons.push(cons[mbti][ind]);
              append = 1;
            }
          }
        }
      }
    }
  }

  //const cons = filteredCons //updates cons to the value of filteredCons

  //filteredCons = [];
  append = 0;

  let refilteredCons = [];

  for (let ind = 0; ind < filteredCons.length; ind++) {
    //removes progCon users from cons list and appends them to filteredCons
    append = 0;
    for (let anuser = 0; anuser < progCon.length; anuser++) {
      if (append === 0) {
        if (ind <= anuser) {
          if (filteredCons[ind] === progCon[anuser]) {
            break;
          } else {
            refilteredCons.push(filteredCons[ind]);
            append = 1;
          }
        } else if (ind > progCon.length - 1) {
          refilteredCons.push(filteredCons[ind]);
          append = 1;
        }
      }
    }
  }

  cons = refilteredCons; //updates cons to the value of refilteredCons
  conlog();
}

function getDesigner() {
  let append = 0;
  for (let i of desPrio) {
    for (let [x, y] of userList) {
      if (designers.length < sgCount - leadCount) {
        if (append <= userList.length - 1) {
          const cont1 = [x, y, "Designer"];
          designers.push(cont1);
          append++;
        }
      }
    }
  }

  userList = userList.filter(
    (user) => !designers.some((designer) => user[0] === designer[0])
  );
  conlog();
}

function distributeDesigner() {
  let length = designers.length;
  let append = 0;
  let group = 0;

  for (let i = 0; i < length; i++) {
    if (group < groupCount - 1) {
      groups[group].push(designers[i]);
      group++;
    } else if (group === groupCount - 1) {
      groups[group].push(designers[i]);
      group = 0;
    }
    append++;
  }

  if (length === append) {
    designers = [];
  }
  conlog();
}



function distribute_anCon() {
  for (let user of anCon) {
    let append = 0;
    for (let group of groups) {
      let counter = 0;
      if (append === 0) {
        for (let user1 of group) {
          if (user1[2] === "Analyst" || user1[2] === "Lead Analyst") {
            counter += 1;
          }
        }
        if (append === 0) {
          if (counter < subCount) {
            group.push(user);
            counter += 1;
            append = 1;
          }
        }
      }
    }
  }

  anCon = anCon.map((userList) =>
    userList.filter((user) => groups.some((group) => group[0][0] === user[0]))
  );
  conlog();
}

function distribute_progCon() {
  for (let user of progCon) {
    let append = 0;
    for (let group of groups) {
      let counter = 0;
      if (append === 0) {
        for (let user1 of group) {
          if (user1[2] === "Programmer" || user1[2] === "Lead Programmer") {
            counter += 1;
          }
        }
        if (append === 0) {
          if (counter < subCount) {
            group.push(user);
            counter += 1;
            append = 1;
          }
        }
      }
    }
  }

  progCon = progCon.map((userList) =>
    userList.filter((user) => groups.some((group) => group[0][0] === user[0]))
  );
  conlog();
}

function distribute_desCon() {
  for (let [user, mbti, role] of desCon) {
    let append = 0;
    for (let group of groups) {
      let counter = 0;
      if (append === 0) {
        for (let user1 of group) {
          if (
            user1[2] === "Designer" ||
            user1[2] === "Lead Designer / Group Leader"
          ) {
            counter += 1;
          }
        }
        if (append === 0) {
          if (counter < subCount) {
            const cont = [user, mbti, "Designer"];
            group.push(cont);
            counter += 1;
            append = 1;
          }
        }
      }
    }
  }

  cons = cons.map((userList) =>
    userList.filter((user) => groups.some((group) => group[0][0] === user[0]))
  );
  conlog();
}

function countRems() {
  //will count excess users (if may remainders)
  let arrList = [
    userList,
    cons,
    leaders,
    designers,
    analysts,
    programmers,
    anCon,
    progCon,
    desCon,
  ];
  let x = groupCount;
  for (let arr of arrList) {
    if (arr.length !== 0) {
      for (let user of arr) {
        if (user.length !== 0) {
          rems.push([user[0], user[1]]);
        }
      }
    }
  }
  conlog();
}

function disRem() {
  let i = 0;

  for (let group in groups) {
    let ind = parseInt(group);
    for (let user of rems) {
      if (i > rems.indexOf(user) && i !== 0) {
        continue;
      }
      let userN = [user[0], user[1], "Designer"];
      groups[ind].push(userN);
      i++;
      break;
    }
  }
}



//                    END OF MAIN DISTRIBUTION SYSTEM
// ****************************************************************************



// *******************************
// *    RESULTS TABLE CREATION   *
// *******************************

function createResultTables(groups) {
  const tableContainer = document.getElementById('tableResult');
  tableContainer.innerHTML ='';
  tableContainer.replaceChildren();


  // SORT ROLES

  let finalDesigners = [];
let finalAnalysts = [];
let finalProgrammers = [];

groups.forEach((currentGroup, currentIndex) => {
    let leadDesChecker = 0;
    let leadAnChecker = 0;
    let leadProChecker = 0;

    for (let i = 0; i < currentGroup.length; i++) {
        let member = currentGroup[i];

        switch (member[2]) {
            case 'Lead Designer / Group Leader':
                finalDesigners.push(member);
                leadDesChecker = 1;
                break;
            case 'Designer':
                if (leadDesChecker === 1) finalDesigners.push(member);
                break;
            case 'Lead Analyst':
                finalAnalysts.push(member);
                leadAnChecker = 1;
                break;
            case 'Analyst':
                if (leadAnChecker === 1) finalAnalysts.push(member);
                break;
            case 'Lead Programmer':
                finalProgrammers.push(member);
                leadProChecker = 1;
                break;
            case 'Programmer':
                if (leadProChecker === 1) finalProgrammers.push(member);
                break;
        }
    }




    // CREATE TABLES
    const outerTable = document.createElement('table');
    outerTable.className = 'result-outer-table';
    const outerThead = document.createElement('thead');
    outerThead.className = 'result-outer-thead';
    const outerTbody = document.createElement('tbody');
    outerTbody.className = 'result-outer-tbody';
    
    // Header row for the outer table
    const outerHeaderRow = document.createElement('tr');
    outerHeaderRow.className = 'result-outer-headrow';
    const outerHeaderCell = document.createElement('th');
    outerHeaderCell.className = 'result-outer-headcell';


    // const groupSpan = document.createElement('span');
    // groupSpan.className = 'table-group-number';
    // groupSpan.textContent = `Group ${currentIndex + 1}`;

    const groupSpan = document.createElement('span');
    groupSpan.className = 'table-group-number';

    groupNumColor = document.createElement('span');
    let groupIndex = (currentIndex + 1);


    let remainder = groupIndex % 4;

    if (remainder == 1) {
      groupNumColor.className = 'table-group-number-class1';
    } else if (remainder == 2) {
      groupNumColor.className = 'table-group-number-class2';
    } else if (remainder == 3) {
      groupNumColor.className = 'table-group-number-class3';
    } else {
      groupNumColor.className = 'table-group-number-class4';
    }
    groupNumColor.textContent = groupIndex;
    
    groupSpan.textContent = `Group `;
    // groupSpan.textContent = `Group ${(currentIndex) + 1}`;

    groupSpan.appendChild(groupNumColor);




    outerHeaderCell.appendChild(groupSpan);
    outerHeaderRow.appendChild(outerHeaderCell);
    outerThead.appendChild(outerHeaderRow);
    outerTable.appendChild(outerThead);

    
    // CREATE INNER TABLES
    function createInnerTable(roleName, roleData) {
      const innerTable = document.createElement('table');
      innerTable.className = 'result-inner-table';
      const innerThead = document.createElement('thead');
      innerThead.className = 'result-inner-thead';
      const innerTbody = document.createElement('tbody');
      innerTbody.className = 'result-inner-tbody';
    
      const innerHeaderRow = document.createElement('tr');
      innerHeaderRow.className = 'result-inner-headrow';
      const innerHeaderCell = document.createElement('th');
      innerHeaderCell.className = 'result-inner-headcell';

      const roleSpan = document.createElement('span');
      roleSpan.className = 'table-role-title';
      roleSpan.textContent = roleName;
      innerHeaderCell.appendChild(roleSpan);
      innerHeaderCell.colSpan = 3;
      innerHeaderRow.appendChild(innerHeaderCell);
      innerThead.appendChild(innerHeaderRow);
      innerTable.appendChild(innerThead);
    
      // Create rows for leaders and members
      roleData.forEach((member, index) => {
        const innerRow = document.createElement('tr');
        innerRow.className = 'result-inner-row';
        const imageCell = document.createElement('td');
        imageCell.className = 'result-inner-imgcell';

        // Assuming there's an icon or image for members


        // ICON / LEGEND FOR LEADERS
        if (member[2].includes('Group Leader')) {
            const bannerStar = document.createElement('img');
            bannerStar.className = 'lead-banner-star';
            bannerStar.src = 'resources/images/PixelArt/bannerstar.png';
            imageCell.appendChild(bannerStar);

        } else if (member[2].includes('Lead Programmer') || member[2].includes('Lead Analyst')) {
            const bannerNormal = document.createElement('img');
            bannerNormal.className = 'lead-banner-normal';
            bannerNormal.src = 'resources/images/PixelArt/banner.png';
            imageCell.appendChild(bannerNormal);
        }


        const nameCell = document.createElement('td');
        nameCell.className = 'result-inner-namecell result-inner-usercells';
        const typeCell = document.createElement('td');
        typeCell.className = 'result-inner-typecell result-inner-usercells';
    
        nameCell.textContent = member[0];
        typeCell.textContent = member[1];

        if (member[2] === 'Lead Designer / Group Leader') {
          nameCell.style.color = '#ffd43b';
          typeCell.style.color = '#ffd43b';
        } else if (member[2] === 'Lead Analyst' || member[2] === 'Lead Programmer'){
          // nameCell.style.color = '#DA77F2';
          nameCell.style.color = '#3BC9DB';
          typeCell.style.color = '#3BC9DB';
        }
    
        innerRow.appendChild(imageCell);
        innerRow.appendChild(nameCell);
        innerRow.appendChild(typeCell);
        innerTbody.appendChild(innerRow);
      });
    
      innerTable.appendChild(innerTbody);
      return innerTable;
    }
    
    // Create inner tables for each role
    const designersTable = createInnerTable('Designers', finalDesigners);
    const analystsTable = createInnerTable('Analysts', finalAnalysts);
    const programmersTable = createInnerTable('Programmers', finalProgrammers);
    
    // Append inner tables to the outer table body
    const designersRow = document.createElement('tr');
    designersRow.className = 'result-outer-desrow';
    const designersCell = document.createElement('td');
    designersCell.className = 'result-outer-descell';
    designersCell.appendChild(designersTable);
    designersRow.appendChild(designersCell);
    outerTbody.appendChild(designersRow);
    
    const analystsRow = document.createElement('tr');
    analystsRow.className = 'result-outer-anrow';
    const analystsCell = document.createElement('td');
    analystsCell.className = 'result-outer-ancell';
    analystsCell.appendChild(analystsTable);
    analystsRow.appendChild(analystsCell);
    outerTbody.appendChild(analystsRow);
    
    const programmersRow = document.createElement('tr');
    programmersRow.className = 'result-outer-progrow';
    const programmersCell = document.createElement('td');
    programmersCell.className = 'result-outer-progcell';


    programmersCell.appendChild(programmersTable);
    programmersRow.appendChild(programmersCell);
    outerTbody.appendChild(programmersRow);
    
    outerTable.appendChild(outerTbody);
    
    // Finally, append the outer table to the document body or any desired container
    tableContainer.appendChild(outerTable);


    finalDesigners = [];
    finalAnalysts = [];
    finalProgrammers = [];
  });
}

// ***********************
// *    MAIN FUNCTION    *
// ***********************

function main() {

  getuserList();

  getLeader();
  distributeLeader();

  getAnalyst();
  getProgrammer();

  getLeadAnalyst();
  distributeLeadAnalyst();

  getLeadProgrammer();
  distributeLeadProgrammer();

  getConflict();

  distributeAnalyst();
  distributeProgrammer();

  sortCon();
  roleCon();

  getDesigner();
  distributeDesigner();

  distribute_anCon();
  distribute_progCon();
  distribute_desCon();

  countRems();
  disRem();
  //out1.innerHTML = groups
  // console.log(groups);

  createResultTables(groups);
  resetVariables()
}

btn1.addEventListener("click", main);


