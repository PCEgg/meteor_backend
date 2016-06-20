Courses = new orion.collection('courses', {
  singularName: 'course', // The name of one of these items
  pluralName: 'courses', // The name of more than one of these items
  link: {
    // *
    //  * The text that you want to show in the sidebar.
    //  * The default value is the name of the collection, so
    //  * in this case it is not necessary.

    title: 'Courses' 
  },
  /**
   * Tabular settings for this collection
   */
  tabular: {
    // here we set which data columns we want to appear on the data table
    // in the CMS panel
    columns: [
      { 
        data: "title", 
        title: "Title" 
      },{ 
        data: "objective", 
        title: "Objective" 
      },{ 
        data: "teacher", 
        title: "Teacher" 
      },{ 
        data: "language", 
        title: "Language" 
      },

/*
      id: 1,
      title: '綜合英語/普通話班(2.5-4歲)',
      objective: '● 活用生活環境及例子，從而引發幼兒對語文的興趣。(2小時課程)',
      feature: '● 講故事，聊天室，諗詩和兒歌，遊戲，烹飪，藝術和工藝，DIY小玩意，音樂與動感~● 學習拼音及詞彙邏輯記憶法~● 用不同主題學習對話及詞彙~● 透過角色扮演培養心智社交能力(心智理論)',
      shotDescription: '活用生活環境及例子，從而引發幼兒對語文的興趣。(2小時課程)',
      integrated: '',
      teacher: '經驗豐富的英語/漢語教師',
      lanuage: '英語/粵語',
      price: '~● 三節課: 原價 $1000，(中心開幕優惠價 $750) ~● 四節課: 原價 $1200，(中心開幕優惠價 $900)~● 五節課: 原價 $1400，(中心開幕優惠價 $1100)~● 月費: 原價$3000，(中心開幕優惠價 $2500)',
      remark: '註:~心智理論（Theory of mind）定義為推論他人心智狀態的能力，例如：想法、信念、慾望和意圖等，並運用此能力去解例如：想法、信念、慾望和意圖等，並運用此能力去解釋他人的想法、知覺及預測他們的行為（Hollin,P, Baron-Cohen,S.,& Hadwin,J，1999）~- 最少報三節課~- 完成１個月課堂之家長可獲1節免費專業資詢服務(15-20分鐘)~- 報讀1個月或以上課程可免費借圖書~- 完成1個月課程可獲証書及兒童發展報告1份 '

    */

    ]
  }
});


Meteor.methods({
  courseInsert: function(courseAttributes) {
    check(courseAttributes, {
      title: String
    });
    
    var errors = validateCourse(courseAttributes);
    if (errors.title)
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
    
    var course = _.extend(courseAttributes, {
      submitted: new Date()
      
    });
    
    var courseId = Courses.insert(course);
    
    return {
      _id: courseId
    };
  },
  
});

Courses.attachSchema(new SimpleSchema({
  // We use `label` to put a custom label for this form field
  // Otherwise it would default to `Title`
  // 'optional: false' means that this field is required
  // If it's blank, the form won't submit and you'll get a red error message
  // 'type' is where you can set the expected data type for the 'title' key's value
  title: {
    type: String,
    optional: false,
    label: 'Course Title'
  },
  // regEx will validate this form field according to a RegEx for a URL
  objective: {
    type: String,
    optional: false,
    label: 'Objective',
  },
  feature: {
    type: String,
    optional: true,
    label: 'Feature',
  },
  shortDescription: {
    type: String,
    optional: false,
    label: 'Short Description',
  },
  integrated: {
    type: String,
    optional: true,
    label: 'Integrated',
  },
  teacher: {
    type: String,
    optional: true,
    label: 'Teacher',
  },
  // 'type: [String]' means this key's value is an array of strings'
  language: {
    type: String,
    optional: true,
    label: 'Language',
  },
  price: {
    type: String,
    optional: true
  },
  remark: {
    type: String,
    optional: true,
    label: 'Remark',
  },
}));
