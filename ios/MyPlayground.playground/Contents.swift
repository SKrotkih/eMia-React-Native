import UIKit

class Person: NSObject {
    let firstName: String
    let lastName: String
    let age: Int
    
    init(firstName: String, lastName: String, age: Int) {
        self.firstName = firstName
        self.lastName = lastName
        self.age = age
    }
    
    override var description: String {
        return "\(firstName) \(lastName)"
    }
}

let alice = Person(firstName: "Alice", lastName: "Smith", age: 24)
let bob = Person(firstName: "Bob", lastName: "Jones", age: 27)
let charlie = Person(firstName: "Charlie", lastName: "Smith", age: 33)
let quentin = Person(firstName: "Quentin", lastName: "Alberts", age: 31)
let people: Array<Person> = [alice, bob, charlie, quentin]
let bobs = people.filter{ $0.firstName == "Bob"}
print("\(bobs)")

var view = UIView(frame: CGRect(x: 0, y: 0, width: 300, height: 300))
view.backgroundColor = UIColor.green
view.layer.borderColor = UIColor.blue.cgColor
view.layer.borderWidth = 10
view.layer.cornerRadius = 20
view

let v1 = UIView(frame:CGRect(x: 113, y: 111, width: 132, height: 194))
v1.backgroundColor = UIColor.black
print(v1)
let v2 = UIView(frame:v1.bounds.insetBy(dx: 10, dy: 10))
v2.backgroundColor = UIColor.red
v1.addSubview(v2)
print(v1.frame)
v2.bounds.origin.x += 10
v2.bounds.origin.y += 10
print(v1.frame)
print(v1.bounds)
v1


