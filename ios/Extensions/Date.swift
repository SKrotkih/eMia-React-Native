//
//  Date.swift
//  eMia
//
//  Copyright © 2017 Vesedia. All rights reserved.
//

import Foundation

extension Date {
   var yearsFromNow:   Int { return Calendar.current.dateComponents([.year],       from: self, to: Date()).year        ?? 0 }
   var monthsFromNow:  Int { return Calendar.current.dateComponents([.month],      from: self, to: Date()).month       ?? 0 }
   var weeksFromNow:   Int { return Calendar.current.dateComponents([.weekOfYear], from: self, to: Date()).weekOfYear  ?? 0 }
   var daysFromNow:    Int { return Calendar.current.dateComponents([.day],        from: self, to: Date()).day         ?? 0 }
   var hoursFromNow:   Int { return Calendar.current.dateComponents([.hour],       from: self, to: Date()).hour        ?? 0 }
   var minutesFromNow: Int { return Calendar.current.dateComponents([.minute],     from: self, to: Date()).minute      ?? 0 }
   var secondsFromNow: Int { return Calendar.current.dateComponents([.second],     from: self, to: Date()).second      ?? 0 }
   var relativeTime: String {
      if yearsFromNow   > 0 { return "\(yearsFromNow) year"    + (yearsFromNow    > 1 ? "s" : "") + " ago" }
      if monthsFromNow  > 0 { return "\(monthsFromNow) month"  + (monthsFromNow   > 1 ? "s" : "") + " ago" }
      if weeksFromNow   > 0 { return "\(weeksFromNow) week"    + (weeksFromNow    > 1 ? "s" : "") + " ago" }
      if daysFromNow    > 0 { return daysFromNow == 1 ? "Yesterday" : "\(daysFromNow) days ago" }
      if hoursFromNow   > 0 { return "\(hoursFromNow) hour"     + (hoursFromNow   > 1 ? "s" : "") + " ago" }
      if minutesFromNow > 0 { return "\(minutesFromNow) minute" + (minutesFromNow > 1 ? "s" : "") + " ago" }
      if secondsFromNow > 0 { return secondsFromNow < 15 ? "Just now"
         : "\(secondsFromNow) second" + (secondsFromNow > 1 ? "s" : "") + " ago" }
      return ""
   }
   
   var years: Int {
      let calendar = Calendar.current
      return calendar.component(.year, from: self)
   }
   
}

extension Date {
   
   func toLocalTime() -> Date {
      let timeZone = TimeZone.autoupdatingCurrent
      let seconds : TimeInterval = Double(timeZone.secondsFromGMT(for: self))
      let localDate = Date(timeInterval: seconds, since: self)
      return localDate
   }
   
   func isGreaterThanDate(dateToCompare: Date) -> Bool {
      //Declare Variables
      var isGreater = false
      
      //Compare Values
      if self.compare(dateToCompare) == ComparisonResult.orderedDescending {
         isGreater = true
      }
      
      //Return Result
      return isGreater
   }
   
   func isLessThanDate(dateToCompare: Date) -> Bool {
      //Declare Variables
      var isLess = false
      
      //Compare Values
      if self.compare(dateToCompare) == ComparisonResult.orderedAscending {
         isLess = true
      }
      
      //Return Result
      return isLess
   }
   
   func equalToDate(dateToCompare: Date) -> Bool {
      //Declare Variables
      var isEqualTo = false
      
      //Compare Values
      if self.compare(dateToCompare) == ComparisonResult.orderedSame {
         isEqualTo = true
      }
      
      //Return Result
      return isEqualTo
   }
   
   func addDays(daysToAdd: Int) -> Date {
      let secondsInDays: TimeInterval = Double(daysToAdd) * 60 * 60 * 24
      let dateWithDaysAdded: Date = self.addingTimeInterval(secondsInDays) as Date
      
      //Return Result
      return dateWithDaysAdded
   }
   
   func addHours(hoursToAdd: Int) -> Date {
      let secondsInHours: TimeInterval = Double(hoursToAdd) * 60 * 60
      let dateWithHoursAdded: Date = self.addingTimeInterval(secondsInHours)
      
      //Return Result
      return dateWithHoursAdded
   }
   
   
   func addMinutes(minutesToAdd: Int) -> Date {
      let secondsInHours: TimeInterval = Double(minutesToAdd) * 60
      let dateWithMinutesAdded: Date = self.addingTimeInterval(secondsInHours)
      
      //Return Result
      return dateWithMinutesAdded
   }
   
   
   func addSeconds(secondsToAdd: TimeInterval) -> Date {
      let dateWithSecondsAdded: Date = self.addingTimeInterval(secondsToAdd)
      
      //Return Result
      return dateWithSecondsAdded
   }
   
   static func getCurrentDateInString(dateStyle: DateFormatter.Style, timeStyle: DateFormatter.Style) -> String {
      let currentTime = Date()
      return currentTime.dateInString(dateStyle: dateStyle, timeStyle: timeStyle)
   }
   
   func dateInString(dateStyle: DateFormatter.Style, timeStyle: DateFormatter.Style) -> String {
      let dateFormatter  = DateFormatter()
      dateFormatter.dateStyle = dateStyle
      dateFormatter.timeStyle = timeStyle
      let currentTimeInString = dateFormatter.string(from: self)
      return currentTimeInString
   }
   
}


