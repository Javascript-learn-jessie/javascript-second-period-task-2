let sinon = require("sinon");
let main = require("../lib/main");

// describe('initMenu()', () => {
//     sinon.spy(console, 'log');
//     it('should display main menu once started', () => {
//         // sinon.spy(console, 'log');
//         main.initMenu();
//         expect(console.log.args.join()).toBe(`1. 添加学生
// 2. 生成成绩单
// 3. 退出
// 请输入你的选择（1～3）：`);
//     });
// });
describe('#addStuScore', () => {
    //    sinon.spy(console, 'log');

    it('should console the format is not right,and show the right format', () => {
        let stuScore = "Bob,20121211,语文：90,数学:80";
        let result = main.addStuScore(stuScore);
        expect(result).toEqual(`请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：`);
    });
    it('should return the student score add successfully', () => {
        let stuScore = "Bob,20180001,语文:90,数学:96,英语:88,编程:98";
        let result = main.addStuScore(stuScore);
        expect(result).toEqual("学生Bob的成绩被添加")
    })
});
describe('#calScoreSheet', () => {
    //    sinon.spy(console, 'log');
    var Student = {
        'name': '', 'stuNum': '', 'score': { 'yw': '', 'sx': '', 'en': '', 'bc': '' }
    };
    var students = new Array(Student);
    students[0].name = '张三';
    students[0].stuNum = '20180001';
    students[0].score.yw = '95';
    students[0].score.sx = '75';
    students[0].score.en = '80';
    students[0].score.bc = '80';
    students[1] = {
        'name': '李四', 'stuNum': '20180002', 'score': { 'yw': '80', 'sx': '85', 'en': '70', 'bc': '90' }
    };
    it('should console the format is not right,and show the right format', () => {
        let stuNums = "20180003-abfdgf-2121";
        let result = main.calScoreSheet(stuNums, students);
        expect(result).toEqual(`请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`);
    });
    it('should return the student score sheet', () => {
        let stuNums = '20180001,20180002,20180003';
        let result = main.calScoreSheet(stuNums, students);
        expect(result).toEqual(`成绩单
姓名|数学|语文|英语|编程|平均分|总分 
========================
张三|75|95|80|80|82.5|330
李四|85|80|70|90|81.25|325
========================
全班总分平均数：327.50
全班总分中位数：327.5`)
    })
});


