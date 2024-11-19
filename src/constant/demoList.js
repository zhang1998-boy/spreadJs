function getDemoList() {
  const demoList = [];
  for (let i = 0; i < 100; i++) {
    demoList.push(
      {
        id: i,
        name: `呼呼_${i}`,
        email: `huhu0${i}@163.com`,
        tel: '13126972690',
        pass: `admin${i}@Zz`,
        sex: i % 2 === 0 ? 1 : 2, // 1 男 2 女
        hobby: [1, 2], // 1 羽毛球 2 乒乓球 3 游泳 4 篮球 5 敲代码
        age: i,
        job: `超酷的工作_${i}`,
        time: 1629970628714,
      }
    );
  }
  return demoList;
}

export const demoList = getDemoList();
