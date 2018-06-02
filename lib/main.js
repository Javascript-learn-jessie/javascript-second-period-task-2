var Student = {
    'name': '', 'stuNum': '', 'score': { 'yw': '', 'sx': '', 'en': '', 'bc': '' }
};
var students = new Array(Student);
//var students = new Student[100];
function main() {
    var answer = initMenu();
    if(answer==1){
        let tips=`请输入学生信息（格式：姓名, 学号,  学科: 成绩, ...），按回车提交：`;
        let query=require('cli-interact').question;
        let stuScoreInfo=query(tips);
        let result = addStuScore(stuScoreInfo);
        console.log(result);
        main();
    }
    else if(answer==2){
        let tips=`请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`;
        let query=require('cli-interact').question;
        let stuNum=query(tips);
        let result = calScoreSheet(stuNum,students);
        console.log(result);
        main();
    }
    else if(answer==3){
        console.log(`1. 添加学生
        2. 生成成绩单
        3. 退出
        请输入你的选择（1～3）：`);
    }
    else{
        main();
    }
}
function initMenu() {
    var menu = `1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：`;
 //   console.log(menu);
    var option = require('cli-interact').getNumber;
    var answer = option(menu, true);
    return answer;
}
function addStuScore(stuScore) {
    let result = '';
    let scoreInfo = stuScore.split(',');
    let len = scoreInfo.length;
    if (len !=6) {
        result = `请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：`;
    } else {
        let index = students.length-1;
        students[index].name = scoreInfo[0];
        students[index].stuNum = scoreInfo[1];
        for(let i=2;i<len;i++){
            let score=scoreInfo[i].split(':');
            console.log(score);
            switch(score[0]){
                case '语文':students[index].score.yw = score[1];
                break;
                case '数学':students[index].score.sx = score[1];
                break;
                case '英语':students[index].score.en = score[1];
                break;
                case '编程':students[index].score.bc = score[1];
                break;
            }
        }
        result = `学生${students[index].name}的成绩被添加`;
    }
    console.log(students);
    return result;
}
function sortby(a, b) {
    return a - b;
}
function calScoreSheet(stuNums, students) {
    let result = `成绩单
姓名|数学|语文|英语|编程|平均分|总分 
========================\n`;
    let numbers = stuNums.split(',');
    console.log(numbers);
    if (numbers[0] == stuNums) {
        // result = `请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`;
        result = `请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`;
    }
    else {
        let totalScore = 0;
        let singleSums = [];
        let totalAvg, median;
        for (let num of numbers) {
            for (let student of students) {
                if (num == student.stuNum) {
                    let sum = parseFloat(student.score.yw) + parseFloat(student.score.sx) + parseFloat(student.score.en) + parseFloat(student.score.bc);
                    //                    console.log(sum);
                    let avg = sum / 4;
                    result += `${student.name}|${student.score.sx}|${student.score.yw}|${student.score.en}|${student.score.bc}|${avg}|${sum}\n`;
                    totalScore += sum;
                    singleSums.push(sum);
                }
            }
        }
        singleSums.sort(sortby);
        totalAvg = parseFloat(totalScore / singleSums.length).toFixed(2);
        let index = Math.floor(singleSums.length / 2);
        singleSums.length % 2 == 0 ? median = (singleSums[index - 1] + singleSums[index]) / 2 : median = singleSums[index];
        result += `========================\n全班总分平均数：${totalAvg}\n全班总分中位数：${median}`;
    }
    return result;
}
main()
exports.main = main;
exports.addStuScore = addStuScore;
exports.calScoreSheet = calScoreSheet;
exports.initMenu = initMenu;