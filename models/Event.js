class Event {
   constructor(
      address,
      author,
      date,
      eventTitle,
      organisor,
      id,
      imageName,
      location,
      end,
      start,
   ) {
      this.address = address;
      this.author = author;
      this.date = date;
      this.eventTitle = eventTitle;
      this.organisor = organisor;
      this.id = id;
      this.imageName = imageName;
      this.location = location;
      this.end = end;
      this.start = start;
   }
}

export default Event;
