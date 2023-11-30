w;
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  if (nums.length === 1) return [`${nums[0]}`];
  const arrow = "->";
  const ans = [];

  let i = 0,
    j = 1; // 双指针(两端边界很重要)
  while (j <= nums.length) {
    const left = nums[i],
      right = nums[j],
      pre = nums[j - 1];
    if (right - pre === 1 && i !== nums.length) {
      // Noop
    } else {
      // 断开
      ans.push(left === pre ? `${left}` : `${left}${arrow}${pre}`);
      // 更新i的值, 下一个区间的开始
      i = j;
    }
    j++;
  }
  return ans;
};

/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  if (nums.length === 1) return [`${nums[0]}`];
  const arrow = "->";
  const ans = [];
  let i = 0,
    j = 1;
  while (j <= nums.length) {
    const left = nums[i],
      right = nums[j],
      pre = nums[j - 1];
    if (right - pre === 1 && i !== nums.length) {
    } else {
      ans.push(left === pre ? `${left}` : `${left}${arrow}${pre}`);
      i = j;
    }
    j++;
  }
  return ans;
};
