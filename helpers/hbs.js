const moment = require('moment');

module.exports = {
  formatDate: function(date, format) {
    return moment(date).format(format);
  },
  
  editIcon: function(storyUser, loggedUser, storyId, floating = true) {
    if(storyUser === loggedUser) {
      if(floating) {
        return `
          <a href="/stories/edit/${storyId}" class="btn-floating halfway-fab grey">
            <i class="fa fa-pencil"></i>
          </a>
        `;
      } else {
        return `
          <a href="/stories/edit/${storyId}" class="grey-text">
            <i class="fa fa-pencil"></i>
          </a>
        `;
      }
    } else {
      return '';
    }
  },
  
  truncate: function(str, len) {
    // if(str.length < len) {
    //   return str;
    // } else {
    //   return `${str.substring(0, len)}...`;
    // }
    
    if(str.length > len && str.length > 0) {
      let new_str = str + " ";

      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(" "));
      new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
      return new_str + '...';
    }
    return str;
  },
  
  stripTags: function(str) {
    // const regex = /(&nbsp;|<([^>]+)>)/ig;
    // return str.replace(regex, );
    
    return str.replace(/<(?:.|\n)*?>/gm, '');
  },
  
  select: function(status, options) {
    return options.fn(this).replace(` value="${status}">`, ` value="${status}" selected>`);
  }
};