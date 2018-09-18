module.exports = {
	classicTwo4One:{
		type:'cal',
		ad: 'classic',
		rule:'-1 > 1',
		calculation:'(-1 * 269.99) - ((-1 % 2) * 269.99)',
	},
	standoutDiscount:{
		type:'comp',
		ad: 'standout',
		rule:'standout',
		calculation:'-1 * 299.99',
	},
	premiumFour:{
		type:'cal',
		ad: 'premium',
		rule:'-1 > 4',
		calculation:'-1 * 379.99',
	},
	classicFive4Four:{
		type:'cal',
		ad: 'classic',
		rule:'x > 4',
		calculation: '(-1 * 269.99) - ((-1 % 4) * 269.99)',
	},
	standoutDiscount2:{
		type:'comp',
		ad: 'standout',
		rule:'standout',
		calculation: '-1 * 309.99',
	},
	premiumDiscount3More:{
		type:'cal',
		ad: 'premium',
		rule:'-1 > 3',
		calculation: '-1 * 389.99',
	},
};