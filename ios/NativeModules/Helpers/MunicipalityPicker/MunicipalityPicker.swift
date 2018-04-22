//
//  RefreshController.swift
//  eMia
//

import UIKit

open class MunicipalityPicker: NSObject {
   
   var pickerView: UIPickerView

   public init(pickerView: UIPickerView) {
      self.pickerView = pickerView
      super.init()
      self.configure(pickerView)
   }
   
   fileprivate var municipalities = [("borgeraabenraakommune","Aabenraa Kommune"),
                                     ("borgeraalborgkommune","Aalborg Kommune"),
                                     ("borgeraarhuskommune","Aarhus Kommune"),
                                     ("borgerearoekommune","Ærø Kommune"),
                                     ("borgeralbertslundkommune","Albertslund Kommune"),
                                     ("borgeralleroedkommune","Allerød Kommune"),
                                     ("borgerassenskommune","Assens Kommune"),
                                     ("borgerballerupkommune","Ballerup Kommune"),
                                     ("borgerbillundkommune","Billund kommune"),
                                     ("borgerbornholmkommune","Bornholms Regionskommune"),
                                     ("borgerbroendbykommune","Brøndby Kommune"),
                                     ("borgerbroenderslevkommune","Brønderslev Kommune"),
                                     ("borgerdragoerkommune","Dragør Kommune"),
                                     ("borgeregedalkommune","Egedal Kommune"),
                                     ("borgeresbjergkommune","Esbjerg Kommune"),
                                     ("borgerfaaborgmidtfynkommune","Faaborg-Midtfyn Kommune"),
                                     ("borgerfanoekommune","Fanø Kommune"),
                                     ("borgerfavrskovkommune","Favrskov Kommune"),
                                     ("borgerfaxekommune","Faxe Kommune"),
                                     ("borgerfredensborgkommune","Fredensborg Kommune"),
                                     ("borgerfredericiakommune","Fredericia Kommune"),
                                     ("borgerfrederiksbergkommune","Frederiksberg Kommune"),
                                     ("borgerfrederikshavnkommune","Frederikshavn Kommune"),
                                     ("borgerfrederikssundkommune","Frederikssund Kommune"),
                                     ("borgerfuresoekommune","Furesø Kommune"),
                                     ("borgergentoftekommune","Gentofte Kommune"),
                                     ("borgergladsaxekommune","Gladsaxe Kommune"),
                                     ("borgerglostrupkommune","Glostrup Kommune"),
                                     ("borgergrevekommune","Greve Kommune"),
                                     ("borgergribskovkommune","Gribskov Kommune"),
                                     ("borgerguldborgsundkommune","Guldborgsund Kommune"),
                                     ("borgerhaderslevkommune","Haderslev Kommune"),
                                     ("borgerhalsnaeskommune","Halsnæs Kommune"),
                                     ("borgerhedenstedkommune","Hedensted Kommune"),
                                     ("borgerhelsingoerkommune","Helsingør Kommune"),
                                     ("borgerherlevkommune","Herlev Kommune"),
                                     ("borgerherningkommune","Herning Kommune"),
                                     ("borgerhilleroedkommune","Hillerød Kommune"),
                                     ("borgerhjoerringkommune","Hjørring Kommune"),
                                     ("borgerhoejetaastrupkommune","Høje-Taastrup Kommune"),
                                     ("borgerholbaekkommune","Holbæk Kommune"),
                                     ("borgerholstebrokommune","Holstebro Kommune"),
                                     ("borgerhorsenskommune","Horsens Kommune"),
                                     ("borgerhoersholmkommune","Hørsholm Kommune"),
                                     ("borgerhvidovrekommune","Hvidovre Kommune"),
                                     ("borgerikastbrandekommune","Ikast-Brande Kommune"),
                                     ("borgerishoejkommune","Ishøj Kommune"),
                                     ("borgerjammerbugtkommune","Jammerbugt Kommune"),
                                     ("borgerkalundborgkommune","Kalundborg Kommune"),
                                     ("borgerkertemindekommune","Kerteminde Kommune"),
                                     ("borgerkk","Københavns Kommune"),
                                     ("borgerkoegekommune","Køge Kommune"),
                                     ("borgerkoldingkommune","Kolding Kommune"),
                                     ("borgerlaesoekommune","Læsø Kommune"),
                                     ("borgerlangelandkommune","Langeland Kommune"),
                                     ("borgerlejrekommune","Lejre Kommune"),
                                     ("borgerlemvigkommune","Lemvig Kommune"),
                                     ("borgerlollandkommune","Lolland Kommune"),
                                     ("borgerlyngbytaarbaekkommune","Lyngby-Taarbæk Kommune"),
                                     ("borgermariagerfjordkommune","Mariagerfjord Kommune"),
                                     ("borgermiddelfartkommune","Middelfart Kommune"),
                                     ("borgermorsoekommune","Morsø Kommune"),
                                     ("borgernaestvedkommune","Næstved Kommune"),
                                     ("borgernorddjurskommune","Norddjurs Kommune"),
                                     ("borgernordfynskommune","Nordfyns Kommune"),
                                     ("borgernyborgkommune","Nyborg Kommune"),
                                     ("borgerodderkommune","Odder Kommune"),
                                     ("borgerodensekommune","Odense Kommune"),
                                     ("borgerodsherredkommune","Odsherred Kommune"),
                                     ("borgerranderskommune","Randers Kommune"),
                                     ("borgerrebildkommune","Rebild Kommune"),
                                     ("borgerringkoebingskjernkommune","Ringkøbing-Skjern Kommune"),
                                     ("borgerringstedkommune","Ringsted Kommune"),
                                     ("borgerroedovrekommune","Rødovre Kommune"),
                                     ("borgerroskildekommune","Roskilde Kommune"),
                                     ("borgerrudersdalkommune","Rudersdal Kommune"),
                                     ("borgersamsoekommune","Samsø Kommune"),
                                     ("borgersilkeborgkommune","Silkeborg Kommune"),
                                     ("borgerskanderborgkommune","Skanderborg Kommune"),
                                     ("borgerskivekommune","Skive Kommune"),
                                     ("borgerslagelsekommune","Slagelse Kommune"),
                                     ("borgersolroedkommune","Solrød Kommune"),
                                     ("borgersoenderborgkommune","Sønderborg Kommune"),
                                     ("borgersoroekommune","Sorø Kommune"),
                                     ("borgerstevnskommune","Stevns Kommune"),
                                     ("borgerstruerkommune","Struer Kommune"),
                                     ("borgersvendborgkommune","Svendborg Kommune"),
                                     ("borgersyddjurskommune","Syddjurs Kommune"),
                                     ("borgertaarnbykommune","T&#229;rnby Kommune"),
                                     ("borgerthistedkommune","Thisted Kommune"),
                                     ("borgertoenderkommune","Tønder Kommune"),
                                     ("borgervallensbaekkommune","Vallensbæk Kommune"),
                                     ("borgervardekommune","Varde Kommune"),
                                     ("borgervejenkommune","Vejen Kommune"),
                                     ("borgervejlekommune","Vejle Kommune"),
                                     ("borgervesthimmerlandskommune","Vesthimmerlands Kommune"),
                                     ("borgerviborgkommune","Viborg Kommune"),
                                     ("borgervordingborgkommune","Vordingborg Kommune")]

   fileprivate var _municipality: (String, String)?
   
   var didSelectMunicipality: ((String, String)?) -> Void = {_ in }
   
   func getName(for id: String?) -> String? {
      guard let id = id else {
         return nil
      }
      return municipalities.filter({$0.0 == id}).first?.1
   }
   
   var municipality: (String, String)? {
      set {
         _municipality = newValue
         didSelectMunicipality(_municipality)
      }
      get {
         return _municipality
      }
   }
   
   private func configure(_ view: UIView) {
      switch view {
      case pickerView:
         pickerView.delegate = self
         pickerView.dataSource = self
         pickerView.tintColor = GlobalColors.kBrandNavBarColor
      default:
         break
      }
   }
   
   func configure(for user: UserModel) {
      guard let municipality = user.address else {
         return
      }
      select(municipality)
   }
   
   func select(_ municipality: String) {
      if let row = municipalities.index(where: {$0.0 == municipality}) {
         _municipality = municipalities[row]
         pickerView.selectRow(row, inComponent: 0, animated: false)
      }
   }
   
}

// MARK: - UIPickerViewDelegate protocol

extension MunicipalityPicker: UIPickerViewDelegate, UIPickerViewDataSource {
   
   public func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
      return municipalities.count
   }
   
   public func numberOfComponents(in pickerView: UIPickerView) -> Int {
      return 1
   }
   
   // The number of columns of data
   public func numberOfComponentsInPickerView(pickerView: UIPickerView) -> Int {
      return 1
   }
   
   // The data to return for the row and component (column) that's being passed in
   public func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
      return municipalities[row].1
   }
   
   public func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
      self.municipality = municipalities[row]
   }
   
}
