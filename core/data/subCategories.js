const categories = [
  {
    id: "1",
    image: "/images/club-1.png",
    title: "خشکشویی  و قالیشویی",
    name: "name",
    page: 5,
    services: [
      {
        title: "نمونه خدمت 1",
        price: "هر عدد/قیمت 1",
        description: "توضیحات خدمت 1...",
      },
      {
        title: "نمونه خدمت 2",
        price: "هر عدد/قیمت 2",
        description: "توضیحات خدمت 2...",
      },
      // Add other services with their details
    ],
    guide: "راهنمای قیمت: امکان‌پذیر است...",
    rules: "قانون و مقررات: توضیحات قانونی...",
    features: "راهنمای استفاده: توضیحات ویژگی‌ها...",
    description: "توضیحات دسته بندی سوم...",
  },
  {
    id: "2",
    name: "name",
    image: "/images/club-1.png",
    title: "شستشوی موکت",
    page: 6,
    services: [
      {
        title: "نمونه خدمت 1",
        price: "هر عدد/قیمت 1",
        description: "توضیحات خدمت 1...",
      },
      {
        title: "نمونه خدمت 2",
        price: "هر عدد/قیمت 2",
        description: "توضیحات خدمت 2...",
      },
      // Add other services with their details
    ],
    guide: "راهنمای قیمت: امکان‌پذیر است...",
    rules: "قانون و مقررات: توضیحات قانونی...",
    features: "راهنمای استفاده: توضیحات ویژگی‌ها...",
    description: "توضیحات دسته بندی چهارم...",
  },
  // Previous categories...
  {
    id: "12",
    name: "name",
    image: "/images/club-1.png",
    title: "خشکشویی لباس",
    page: 5,
    services: [
      {
        title: "نمونه خدمت 1",
        price: "هر عدد/قیمت 1",
        description: "توضیحات خدمت 1...",
      },
      {
        title: "نمونه خدمت 2",
        price: "هر عدد/قیمت 2",
        description: "توضیحات خدمت 2...",
      },
      // Add other services with their details
    ],
    guide: "راهنمای قیمت: امکان‌پذیر است...",
    rules: "قانون و مقررات: توضیحات قانونی...",
    features: "راهنمای استفاده: توضیحات ویژگی‌ها...",
    description: "توضیحات دسته بندی سوم...",
  },
  {
    id: "4",
    name: "name",
    image: "/images/club-1.png",
    title: "نماشویی",
    page: 6,
    services: [
      {
        title: "نمونه خدمت 1",
        price: "هر عدد/قیمت 1",
        description: "توضیحات خدمت 1...",
      },
      {
        title: "نمونه خدمت 2",
        price: "هر عدد/قیمت 2",
        description: "توضیحات خدمت 2...",
      },
      // Add other services with their details
    ],
    guide: "راهنمای قیمت: امکان‌پذیر است...",
    rules: "قانون و مقررات: توضیحات قانونی...",
    features: "راهنمای استفاده: توضیحات ویژگی‌ها...",
    description: "توضیحات دسته بندی چهارم...",
  },
  // Repeat this structure for additional categories...
  {
    id: "5",
    name: "name",
    title: "مبل شویی",
    page: 7,
    image: "/images/club-1.png",
    services: [
      {
        title: "نمونه خدمت 1",
        price: "هر عدد/قیمت 1",
        description: "توضیحات خدمت 1...",
      },
      {
        title: "نمونه خدمت 2",
        price: "هر عدد/قیمت 2",
        description: "توضیحات خدمت 2...",
      },
      // Add other services with their details
    ],
    guide: "راهنمای قیمت: امکان‌پذیر است...",
    rules: "قانون و مقررات: توضیحات قانونی...",
    features: "راهنمای استفاده: توضیحات ویژگی‌ها...",
    description: "توضیحات دسته بندی پنجم...",
  },
  {
    id: "6",
    name: "name",
    image: "/images/club-3.png",
    title: "نظافت ساختمان",
    page: 5,
    services: [
      {
        title: "نمونه خدمت 1",
        price: "هر عدد/قیمت 1",
        description: "توضیحات خدمت 1...",
      },
      {
        title: "نمونه خدمت 2",
        price: "هر عدد/قیمت 2",
        description: "توضیحات خدمت 2...",
      },
      // Add other services with their details
    ],
    guide: "راهنمای قیمت: امکان‌پذیر است...",
    rules: "قانون و مقررات: توضیحات قانونی...",
    features: "راهنمای استفاده: توضیحات ویژگی‌ها...",
    description: "توضیحات دسته بندی سوم...",
  },
  {
    id: "7",
    name: "name",
    image: "/images/club-2.png",
    title: "نظافت ساختمان",
    page: 5,
    services: [
      {
        title: "نمونه خدمت 1",
        price: "هر عدد/قیمت 1",
        description: "توضیحات خدمت 1...",
      },
      {
        title: "نمونه خدمت 2",
        price: "هر عدد/قیمت 2",
        description: "توضیحات خدمت 2...",
      },
      // Add other services with their details
    ],
    guide: "راهنمای قیمت: امکان‌پذیر است...",
    rules: "قانون و مقررات: توضیحات قانونی...",
    features: "راهنمای استفاده: توضیحات ویژگی‌ها...",
    description: "توضیحات دسته بندی سوم...",
  },
  {
    id: "8",
    name: "name",
    title: "نظافت ساختمان",
    page: 5,
    services: [
      {
        title: "نمونه خدمت 1",
        price: "هر عدد/قیمت 1",
        description: "توضیحات خدمت 1...",
      },
      {
        title: "نمونه خدمت 2",
        price: "هر عدد/قیمت 2",
        description: "توضیحات خدمت 2...",
      },
      // Add other services with their details
    ],
    image: "/images/club-1.png",
    guide: "راهنمای قیمت: امکان‌پذیر است...",
    rules: "قانون و مقررات: توضیحات قانونی...",
    features: "راهنمای استفاده: توضیحات ویژگی‌ها...",
    description: "توضیحات دسته بندی سوم...",
  },
  // Repeat this structure for more categories...
];

export default categories;
