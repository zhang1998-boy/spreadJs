/**
 * @description: 模拟根据条件查询
 * @param {SearchParamsType} params
 * @return {*}
 */
function getTableListData(params) {
  const allData = [];
  for (let i = 0; i < 96; i++) {
    allData.push({
      id: i + 1,
      ruleName: `${i + 1}_这是一条规则名称`,
      describe: `${i + 1}_这是一段描述`,
      frequency: i + 1,
      status: i % 2 === 0 ? 1 : 2,
      useTime: new Date().getTime(),
    });
  }
  const startIdx = (params.pageNum - 1) * params.pageSize;
  const endIdx = params.pageSize + startIdx;
  const filterDataList = allData.slice(startIdx, endIdx);
  let result = [];

  if (params.ruleName && params.describe) {
    result = filterDataList.filter((item) => {
      const hasRuleName = item.ruleName.includes(params.ruleName);
      const hasDesc = item.describe.includes(params.describe);
      return hasRuleName || hasDesc;
    });
  } else if (params.ruleName) {
    result = filterDataList.filter((item) => item.ruleName.includes(params.ruleName));
  } else if (params.describe) {
    result = filterDataList.filter((item) => item.describe.includes(params.describe));
  } else {
    result = filterDataList;
  }

  return {
    result,
    total: params.ruleName || params.describe ? result.length : allData.length,
  };
}

export default {
  'get|/api/table/table-list': (options) => {
    const params = JSON.parse(options.body);
    return {
      code: 0,
      message: 'success',
      data: getTableListData(params),
    };
  },
};
