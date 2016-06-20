// This is what it used to be:
// Posts = new Mongo.Collection('posts');

// Instead let's do:
Posts = new orion.collection('posts', {
  singularName: 'post', // The name of one of these items
  pluralName: 'posts', // The name of more than one of these items
  link: {
    // *
    //  * The text that you want to show in the sidebar.
    //  * The default value is the name of the collection, so
    //  * in this case it is not necessary.

    title: 'Posts'
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
        data: "author",
        title: "Author"
      },{
        data: "submitted",
        title: "Submitted"
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


Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
});

validatePost = function (post) {
  var errors = {};

  if (!post.title)
    errors.title = "Please fill in a headline";

  if (!post.url)
    errors.url =  "Please fill in a URL";

  return errors;
}

Meteor.methods({
  postInsert: function(postAttributes) {
    check(this.userId, String);
    check(postAttributes, {
      title: String,
      url: String
    });

    var errors = validatePost(postAttributes);
    if (errors.title || errors.url)
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  },

  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);

    var affected = Posts.update({
      _id: postId,
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });

    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  }
});


/**
 * Now we will define and attach the schema for this collection.
 * Orion will automatically create the corresponding form.
 */
Posts.attachSchema(new SimpleSchema({
  // We use `label` to put a custom label for this form field
  // Otherwise it would default to `Title`
  // 'optional: false' means that this field is required
  // If it's blank, the form won't submit and you'll get a red error message
  // 'type' is where you can set the expected data type for the 'title' key's value
  title: {
    type: String,
    optional: false,
    label: 'Post Title'
  },
  // regEx will validate this form field according to a RegEx for a URL
  url: {
    type: String,
    optional: false,
    label: 'URL',
    regEx: SimpleSchema.RegEx.Url
  },
  // autoform determines other aspects for how the form is generated
  // In this case we're making this field hidden from view
  userId: {
    type: String,
    optional: false,
    autoform: {
      type: "hidden",
      label: false
    },
  },
  body: orion.attribute('froala', {
    label: 'Body'
  }),
  author: {
    type: String,
    optional: false,
  },
  image: orion.attribute('image', {
    label: 'Image',
    optional: true
  }),
  // 'type: Date' means that this field is expecting a data as an entry
  submitted: {
    type: Date,
    optional: false,
  },
  commentsCount: {
    type: Number,
    optional: false
  },
  // 'type: [String]' means this key's value is an array of strings'
  upvoters: {
    type: [String],
    optional: true,
    autoform: {
      disabled: true,
      label: false
    },
  },
  votes: {
    type: Number,
    optional: true
  },
}));
