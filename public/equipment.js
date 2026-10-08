// Learning content transcribed and summarized from the user's photographed training material.
const EQUIPMENT_LESSONS = [
  {id:'equipment-principles',title:'FOM, A-Scan und B-Scan unterscheiden',minutes:7,body:[
    'Einstichsonden wie FOM S70/S71, FOM II, Hennessy GP4, PG 200 und OptiGrade MCP messen optoelektronisch. Lichtsender und Photodetektor erfassen unterschiedliche Reflexionen der Gewebe. Die Messung erfolgt beim Zurückziehen der Sonde; aus Reflexionskurve und Wegmessung werden Speck- und Fleischmaße ermittelt.',
    'Ultraschallgeräte messen nicht invasiv: Der Schallkopf liegt auf der feuchten Schwarte. Schallwellen werden an Gewebegrenzen reflektiert. Aus den Laufzeiten der Echos werden Gewebedicken bestimmt. Wasser dient in den Unterlagen als Ankopplungsmedium zwischen Schallkopf und Schwarte.',
    'A-Scan (A = Amplitude): Das US-Porkitron bestimmt Längen aus Ultraschall-Laufzeiten ohne zweidimensionale Bildauswertung. Es besitzt getrennte Sende-/Empfangssysteme für Speck- und Fleischmessung.',
    'B-Scan (B = Brightness): Das CSB-Ultra-Meater erzeugt ein zweidimensionales Grautonbild. Die Auswertung ermittelt die Gewebedicken; der Klassifizierer beurteilt zusätzlich Bildqualität, vollständigen Kontakt und mögliche Artefakte.',
    'AutoFOM I und III verwenden ebenfalls Ultraschall, erfassen aber automatisch viele Messungen mit einem Array aus 16 Schallköpfen. FOM-Einstichsonde und AutoFOM-Array haben unterschiedliche Messprinzipien und Prüfabläufe.'
  ],en:'Optical FOM probes measure tissue reflectance while being withdrawn. Ultrasound uses echo travel times and requires acoustic coupling. A-scan measures lengths without a two-dimensional image; B-scan produces a grayscale image. AutoFOM uses an array of 16 ultrasound heads for automatic scanning.'},
  {id:'autofom-system',title:'AutoFOM I und III: Aufbau und Messung',minutes:7,body:[
    'Das Array ist der Messwertaufnehmer: ein Bügel mit 16 Ultraschallsensoren. In den Unterlagen sind die Schallköpfe im Abstand von 25 mm angeordnet. Der ungeöffnete Schlachtkörper gleitet mit dem Rücken über das Array. Saubere, feuchte Schwarte und ausreichender Kontakt ermöglichen die Messwerterfassung.',
    'AutoFOM I: Zum System gehören Array, Schaltschrank/BIG BOX, Panel, Workstation mit Auswerteelektronik und Protokolldrucker. Marker und Identifikationssystem unterstützen die Zuordnung der Messergebnisse zum richtigen Schlachtkörper.',
    'AutoFOM III: Array, Split Box, Control Panel, Datenerfassungs- und Bildanalyseserver, Touchscreen und Ethernet-Switches arbeiten zusammen. CaroSecure speichert die Ergebnisse im gesicherten Bereich; ein Drucker gibt die Dokumentation aus.',
    'Die Systeme schätzen den Muskelfleischanteil und können Teilstückgewichte sowie den Muskelfleischanteil des Bauches berechnen. AutoFOM III liefert gegenüber AutoFOM I eine höhere Bildauflösung. Die Berechnungen erfolgen mit den jeweils zugelassenen Softwaremodulen.',
    'Die Schlachtkörperidentität muss über die Linie erhalten bleiben: Messung, Schlachtnummer und späteres Schlachtgewicht müssen zusammengehören. Ein korrekter Messwert am falschen Schlachtkörper ergibt eine falsche Zuordnung.'
  ],en:'Both AutoFOM generations scan carcasses with 16 ultrasound heads. AutoFOM I uses a cabinet, panel and workstation; III adds a split box, acquisition and image-analysis servers, touchscreen and CaroSecure. Correct carcass identification links the scan to its number and weight.'},
  {id:'morning-control',title:'Morgenkontrolle: die vier Prüfbereiche',minutes:7,body:[
    'Die Morgenkontrolle prüft die Funktionsfähigkeit vor der Klassifizierung. Die fotografierte Anleitung gliedert sie in Gerätekonfiguration (Hardware und Software), eichtechnische Kontrolle, Umgebungsbedingungen und Protokollprüfung.',
    'Gerätekonfiguration: Passen Sonde beziehungsweise Schallkopf, Drucker und Prüfmittel zur Zulassung? Sind Bewegungen, Kontaktplatte und Markiereinrichtung funktionsfähig? Stimmen Anzeige und aufgezeichnete Messwerte überein?',
    'Bei optischen Einstichsonden werden Sondenspitzen auf Verschleiß und Abmessungen geprüft. Ein gerätespezifischer Testblock (Etalon) simuliert definierte Längen und Reflexionen. Tatsächliche Testblocklänge und angezeigter Sollwert können wegen interner Korrekturfaktoren voneinander abweichen.',
    'Eichtechnische Kontrolle: Hauptschild, Eich- und Sicherungskennzeichen sowie Plomben müssen vorhanden und unbeschädigt sein. Bei den dafür vorgesehenen älteren Geräten müssen zusammengehörige Teilgeräte dieselbe Anlagennummer tragen.',
    'Umgebung und Dokumentation: Arbeitsbedingungen, Kontakt/Wasserzufuhr, zugelassene Anordnung und Protokoll prüfen. Bei einem nicht bestandenen Test wird die Ursache geklärt; die Unterlagen beschreiben bei FOM II, PG 200 und OptiGrade eine gesperrte Klassifizierung.',
    'Begriff merken: Ein Etalon ist ein Prüfmittel mit bekannten Eigenschaften. Die Prüfung vergleicht Istwerte mit festgelegten Sollwerten und Toleranzen; sie ist keine freie Änderung der Geräteeinstellung.'
  ],en:'Morning checks cover configuration, verification seals, environment and records. An etalon is a reference test piece. Compare measured values with the correct specified values; a failed check requires resolution before classification.'},
  {id:'autofom-software',title:'AutoFOM: Software und Prüfsummen',minutes:8,body:[
    'AutoFOM I – Lernbeispiel aus der Anleitung, Stand 14.03.2016: Die Geräte-Prüf-CD des Max Rubner-Instituts enthält bekannte Daten. Am Panel wird STAND BY → TEST → ANALYSIS TEST → OK gewählt. Das System wertet die Daten aus und zeigt beziehungsweise druckt die Ergebnisse.',
    'Für diese Geräte-CD nennt die Anleitung MFA 58,9 %, T1 −1,6865, T2 +4,4953, T3 −0,6603 und RCS-Prüfziffer 254.1323.4.14. Diese Sollwerte sind ohne Toleranz zu ermitteln. Überwacher-CDs können andere Ergebnisse besitzen. Andere fotografierte Unterlagen nennen eine andere RCS-Prüfziffer; deshalb immer die zur Anlage und zum Prüfdatensatz gehörende Vorgabe vergleichen.',
    'AutoFOM III: Am Control Panel Test → Analysistest aufrufen und Start Analysistest wählen. Vier gespeicherte Rohdatensätze prüfen die Ultraschall-Bildverarbeitungskette. Die fotografierte Anleitung nennt MFA-Ergebnisse 62,0 %, 53,6 %, 62,3 % und 58,9 %. Übereinstimmende Ergebnisse werden als Bestanden angezeigt.',
    'Zusätzlich werden installierte Softwareversionen, Revisionsnummern und MD5-Checksummen mit der zugehörigen Baumusterprüfbescheinigung verglichen. Das Bestehen der vier Beispieldatensätze ersetzt diesen Vergleich nicht.',
    'Das Testprotokoll dokumentiert Systemidentität, Softwareversionen, Analysistest und Schallkopftest mit Zeitangaben. Laut Anleitung wird die Anzeige-Software nur am Bildschirm dargestellt. Während des Morgentests wird die Anlage offline gesetzt und beim Beenden wieder online gestellt; die Systemhinweise werden bestätigt.'
  ],en:'AutoFOM I checks known MRI CD data and its RCS checksum. III tests four stored datasets and compares software revisions and MD5 checksums with the applicable approval. Values here are dated source examples, not universal settings.'},
  {id:'autofom-hardware',title:'AutoFOM: alle 16 Schallköpfe prüfen',minutes:7,body:[
    'AutoFOM I – Anleitung vom 14.03.2016: TEST → TRANSDUCER TEST → OK. Zu Beginn stehen die Prüfungszähler auf null. Die Schallköpfe dünn mit Gel bestreichen und den Teststab senkrecht aufsetzen; die Messung erfolgt automatisch. Alle 16 Schallköpfe sind einzeln zu prüfen.',
    'Für AutoFOM I nennt die Anleitung 100,0 ± 0,9 mm, also 99,1 bis 100,9 mm. Bei einer Serie wird das letzte Ergebnis beurteilt. Panel und Drucker müssen übereinstimmen. Auch die Funktionsfähigkeit des AutoFOM-Markers wird geprüft.',
    'AutoFOM III: Test → Schallkopftest öffnen, den Status des letzten Morgentests ansehen und mit Test zurücksetzen den bisherigen Test zurücksetzen. In der Anleitung ist ein Schallkopftest 24 Stunden gültig.',
    'Alle 16 Köpfe gleichmäßig mit Kontaktgel bestreichen. Den Teststab mit leichtem Druck senkrecht und vollständig auflegen. Die automatische Messung erscheint als weiße Linie im grünen Balken; das Ergebnissymbol wechselt bei bestandenem Test von Schlecht zu Gut.',
    'Für AutoFOM III nennt die Anleitung 50,0 ± 1,0 mm, also 49,0 bis 51,0 mm. Zusätzlich müssen technische Parameter wie Echoamplitude und Bandbreite eingehalten werden. Ein passender Längenwert allein genügt daher nicht.',
    'Nach bestandener Prüfung aller 16 Köpfe Test beenden wählen und den Protokollausdruck bestätigen. Diese Abläufe und Zahlen stammen aus den fotografierten Unterlagen; zur praktischen Durchführung wird die passende freigegebene Anlagenanleitung verwendet.'
  ],en:'Test every one of the 16 heads with gel and a perpendicular reference rod. The source specifies 100 ±0.9 mm for I and 50 ±1 mm for III. III also checks other technical parameters and describes 24-hour validity. Finish and print the test record.'},
  {id:'autofom-environment',title:'AutoFOM: Sicherungen, Umgebung und Protokoll',minutes:7,body:[
    'Die Zulassung des technischen Umfelds ist standortbezogen. Anordnung und Maße um das Array, Schlachtbandgeschwindigkeit, Hakentyp, Wasserzufuhr und Dateneingänge werden mit den Unterlagen des konkreten Standorts verglichen. Die Zeichnungen im Buch sind Beispiele.',
    'Prüfen: Ist die Wasserablauföffnung vor dem Array frei? Ist die Wasserzufuhr im vorgegebenen Bereich? Gibt es zusätzliche Um- oder Anbauten im eichpflichtigen Bereich? Stimmen Array-Identität beziehungsweise Nummer am Typenschild und die Zahl der Dateneingänge mit der Dokumentation überein?',
    'Eichkennzeichen und Sicherungen an Hauptschild, Array, Schaltschrank beziehungsweise Computerschrank, Control Panel, Split Box, CaroSecure und Strömungswächter werden entsprechend der jeweiligen Zulassung geprüft. CaroSecure muss verriegelt sein; die Eichgültigkeit wird kontrolliert.',
    'Wartungsbeispiele aus den Unterlagen: Bei AutoFOM I wird das XAMP-Board nach zwei Millionen Messungen oder spätestens zwei Jahren ausgetauscht. Bei AutoFOM III wird das Frontend-Board alle drei Jahre ausgetauscht. Diese Vorgaben werden zur jeweiligen Anlage nachgeschlagen.',
    'Protokollprüfung: Schlachtnummer, Messwerte beziehungsweise Variablen, Ergebnis, Schlachttag und Klassifiziererkennung prüfen. Zusätzlich nennt die Anleitung korrekte MFA- und Teilstückberechnung, protokollierte Hardware-/Softwaretests sowie die Unterschrift des Klassifizierers.',
    'Die hochgeladenen Zulassungsübersichten tragen Stand 07.12.2020. Versionslisten und frühere Gültigkeitsdaten daraus sind historische Angaben. Für den Anlagenvergleich gehören Bescheinigung, Nachträge und standortbezogener MRI-Prüfbericht zusammen.'
  ],en:'Approval of the technical environment is site-specific. Check layout, speed, drainage, water, inputs, seals and device identity against the installation documents. Records must preserve identification, measurements, results and tests. Approval tables supplied are dated 2020.'},
  {id:'autofom-calculation',title:'Teilstückgewichte aus Basiswert und Gewicht',minutes:6,body:[
    'Die Unterlagen erklären den Basiswert als bereits berechneten Teil der Teilstückformel. Das Schlachtgewicht fehlt noch als letzte Variable. Die vereinfachte Lernformel lautet: Teilstückgewicht (kg) = (Basiswert + Schlachtgewicht × Faktor) × 2.',
    'Zuerst Schlachtgewicht mit dem zum Teilstück und System gehörenden Faktor multiplizieren. Dann den Basiswert addieren und erst danach mit 2 multiplizieren. Der Basiswert kann negativ sein.',
    'Beispiel aus dem AutoFOM-III-Handout: Schlachtgewicht 96,8 kg, Basiswert SCSI 1,2093 und Faktor 0,0814. (1,2093 + 96,8 × 0,0814) × 2 = 18,17764 kg, gerundet 18,18 kg schierer Schinken.',
    'Weitere Werte desselben Beispiels: LAKG 0,2505 mit Faktor 0,0336 ergibt 7,01 kg; TESI −0,0451 mit Faktor 0,0471 ergibt 9,03 kg; BAKG −1,3502 mit Faktor 0,0853 ergibt 13,81 kg.',
    'Abkürzungen in den Unterlagen: SCKG Schinken, SCSI Schinken schier, KOKG Kotelett, LAKG Lachs, TEKG Teller, TESI Teller schier, BAKG Bauch und BA% Muskelfleischanteil des Bauches. Prozentangaben werden nicht als Kilogramm behandelt.',
    'Faktoren und Basiswerte von AutoFOM I und III dürfen nicht vermischt werden. Eine weitere Tabelle rundet Faktoren stärker als das Rechenbeispiel; für exakte Rechnungen die vollständigen freigegebenen Werte verwenden und erst das Endergebnis runden.'
  ],en:'Part weight = (base value + carcass weight × factor) × 2. The III example gives (1.2093 + 96.8 × 0.0814) × 2 = 18.18 kg. Keep system-specific factors together and round only the final result.'}
].map(l=>({...l,topic:'FOM-Gerät',source:'Quelle: deine fotografierten Schulungsunterlagen; Geräteprüfanleitung Stand 14.03.2016, Zulassungsübersicht Stand 07.12.2020 und ergänzende Handouts.'}));

const EQUIPMENT_QUESTIONS = [
 ['principle','Welches Messprinzip verwendet eine optische FOM-Einstichsonde?',['Reflexion von Licht im Gewebe','Ultraschall-Laufzeit','Nur das Schlachtgewicht','Temperaturmessung'],0,'Lichtsender und Photodetektor erfassen die Reflexionskurve beim Zurückziehen der Sonde.'],
 ['heads','Wie viele Ultraschallköpfe hat das AutoFOM-Array in den Unterlagen?',['4','8','16','32'],2,'AutoFOM I und III besitzen jeweils 16 Ultraschallsensoren im Array.'],
 ['scan','Was unterscheidet B-Scan vom beschriebenen A-Scan?',['B-Scan erzeugt ein zweidimensionales Grautonbild','B-Scan ist eine optische Einstichmessung','A-Scan benötigt keine Echos','B-Scan misst nur das Gewicht'],0,'B-Scan liefert ein Ultraschallbild, A-Scan ermittelt Längen ohne diese zweidimensionale Bildauswertung.'],
 ['coupling','Warum braucht der Ultraschallkopf Kontakt mit einer feuchten Oberfläche?',['Für die akustische Ankopplung','Damit der Klassenbuchstabe sichtbar wird','Zum Erhöhen des Gewichts','Zum Verändern der Formel'],0,'Das Ankopplungsmedium unterstützt die Schallübertragung zwischen Kopf und Schwarte.'],
 ['areas','Welche vier Bereiche umfasst die Morgenkontrolle?',['Konfiguration, eichtechnische Kontrolle, Umgebung und Protokoll','Futter, Transport, Geschmack und Preis','Nur Software und Drucker','Nur Gewicht und Klasse'],0,'Diese vier Bereiche strukturieren die fotografierte Geräteprüfanleitung.'],
 ['etalon','Was ist ein Etalon?',['Ein Prüfmittel mit bekannten Eigenschaften','Eine neue Handelsklasse','Eine freie Kalibrierformel','Ein Schlachtnummernformat'],0,'Ein Testblock oder Teststab liefert bekannte Referenzeigenschaften zum Soll-Ist-Vergleich.'],
 ['i-length','Welchen Teststabwert nennt die Anleitung von 2016 für AutoFOM I?',['50 ± 1 mm','100 ± 0,9 mm','100 ± 9 mm','50 ± 0,1 mm'],1,'Die AutoFOM-I-Schallkopfprüfung nennt 100,0 ± 0,9 mm.'],
 ['iii-length','Welcher Wert liegt im beschriebenen AutoFOM-III-Längenbereich von 50 ± 1 mm?',['48,9 mm','51,1 mm','50,4 mm','55 mm'],2,'Der Bereich beträgt 49,0 bis 51,0 mm. Weitere technische Kriterien müssen ebenfalls erfüllt sein.'],
 ['all-heads','Wann ist die vollständige Schallkopfprüfung abgeschlossen?',['Nach einem bestandenen Kopf','Nachdem alle 16 Köpfe bestanden haben','Sobald der Drucker Papier hat','Nach einer Gewichtseingabe'],1,'Alle 16 Köpfe müssen geprüft werden; ein einzelnes Ergebnis deckt das Array nicht ab.'],
 ['software','Welche zwei Ziele hat der AutoFOM-III-Analysistest laut Anleitung?',['Bildverarbeitungskette und installierte Software prüfen','Gewicht und Geschmack prüfen','Gelmenge und Papierfarbe prüfen','Die EU-Klassengrenzen ändern'],0,'Bekannte Rohdatensätze prüfen die Verarbeitung; Versionen und Checksummen werden mit der Bescheinigung verglichen.'],
 ['identity','Warum muss die Schlachtkörperidentität entlang der Linie erhalten bleiben?',['Damit Messwerte und Gewicht dem richtigen Schlachtkörper zugeordnet werden','Damit alle Tiere denselben MFA erhalten','Damit kein Protokoll nötig ist','Damit die Formel frei wählbar ist'],0,'Scan, Schlachtnummer und Gewicht müssen zusammengehören.'],
 ['site','Welche Unterlagen bestimmen die technische Umgebung einer AutoFOM-Anlage?',['Die Unterlagen des konkreten zugelassenen Standorts','Jede beliebige Beispielzeichnung','Nur die Anzahl der Mitarbeiter','Nur die Displayfarbe'],0,'Layout, Wasserzufuhr und andere Standortbedingungen werden mit den zugehörigen Unterlagen verglichen.'],
 ['checksum','Die Softwareversion passt, die MD5-Prüfsumme weicht von der Vorgabe ab. Was folgt daraus?',['Der Vergleich ist nicht vollständig bestanden','Die Abweichung ist immer zulässig','Die Prüfsumme wird selbst überschrieben','Die Schlachtklasse wird geändert'],0,'Die geforderten Versionen und Prüfsummen müssen zur jeweils gültigen Anlagenvorgabe passen.'],
 ['formula','Wie lautet die Teilstückgewicht-Lernformel im Handout?',['(Basiswert + Schlachtgewicht × Faktor) × 2','Basiswert + Schlachtgewicht + Faktor','Schlachtgewicht ÷ Basiswert','Basiswert × Faktor ohne Schlachtgewicht'],0,'Zuerst die gewichtabhängige Komponente bilden, Basiswert addieren, dann mit 2 multiplizieren.'],
 ['example','Was ergibt das Beispiel (1,2093 + 96,8 × 0,0814) × 2?',['18,18 kg','9,09 kg','96,8 kg','1,21 kg'],0,'Das Ergebnis ist 18,17764 kg, gerundet 18,18 kg.'],
 ['rounding','Wie werden genaue Teilstückberechnungen durchgeführt?',['Mit vollständigen passenden Faktoren; erst das Ergebnis runden','Mit beliebigen gerundeten Faktoren','Mit Faktoren aus beiden AutoFOM-Generationen','Immer mit positivem Basiswert'],0,'Die Unterlagen enthalten unterschiedlich gerundete Tabellen. Verwende den passenden vollständigen Faktor und bewahre auch negative Basiswerte.']
].map(([id,q,opts,answer,why])=>({id:'equipment-'+id,topic:'FOM-Gerät',q,opts,answer,why}));

const equipmentLessonQuestions={
 'equipment-principles':['principle','scan','coupling'],
 'autofom-system':['heads','identity','coupling'],
 'morning-control':['areas','etalon','site'],
 'autofom-software':['software','checksum'],
 'autofom-hardware':['i-length','iii-length','all-heads','etalon'],
 'autofom-environment':['site','identity','areas'],
 'autofom-calculation':['formula','example','rounding']
};
for(const lesson of EQUIPMENT_LESSONS) lesson.questionIds=equipmentLessonQuestions[lesson.id].map(id=>'equipment-'+id);
EQUIPMENT_LESSONS.find(l=>l.id==='autofom-system').figures=[{src:'/autofom-diagram.svg',afterParagraph:1,caption:'AutoFOM III: 16 Ultraschallköpfe im U-Bügel, Datenübertragung und Teilstückanalyse am Schlachtband.'}];
EQUIPMENT_LESSONS.find(l=>l.id==='autofom-hardware').figures=[{src:'/autofom-lengths.svg',afterParagraph:4,caption:'AutoFOM I und III: verschiedene Prüflängen aus der Anleitung 2016. Die Zahlen allein ersetzen keine vollständige Schallkopfprüfung.'}];

const EQUIPMENT_CARDS = [
 ['eq1','AutoFOM-Array: Anzahl der Schallköpfe?','16 Schallköpfe; alle einzeln prüfen.'],
 ['eq2','FOM-Sonde und AutoFOM: Messprinzip?','Optische FOM-Sonde: Lichtreflexion beim Zurückziehen. AutoFOM: automatische Ultraschallmessung.'],
 ['eq3','Vier Bereiche der Morgenkontrolle?','Konfiguration, eichtechnische Kontrolle, Umgebungsbedingungen, Protokoll.'],
 ['eq4','Teststabwerte laut Geräteprüfanleitung 2016?','AutoFOM I: 100 ± 0,9 mm. AutoFOM III: 50 ± 1,0 mm. Zur konkreten Anlage passende Vorgaben nachschlagen.'],
 ['eq5','AutoFOM III: Analysistest prüft was?','Die Ultraschall-Bildverarbeitungskette mit vier Rohdatensätzen sowie Softwareversionen und Checksummen.'],
 ['eq6','Teilstückgewicht aus Basiswert?','(Basiswert + Schlachtgewicht × passender Faktor) × 2; erst am Ende runden.'],
 ['eq7','SCSI, LAKG, TESI und BAKG?','Schinken schier, Lachs, Teller schier und Bauch; BA% ist dagegen eine Prozentangabe.'],
 ['eq8','Warum standortbezogene AutoFOM-Unterlagen?','Die zugelassene technische Umgebung und Anlagenkonfiguration unterscheiden sich je Standort.']
];

