// Read-only OCR of project artwork; output normalized top-left text rectangles.
import Foundation
import Vision
import ImageIO
var output:[[String:Any]]=[]
for path in CommandLine.arguments.dropFirst() {
 let url=URL(fileURLWithPath:path)
 let request=VNRecognizeTextRequest()
 request.recognitionLevel = .accurate
 request.recognitionLanguages = ["ko-KR","en-US"]
 request.usesLanguageCorrection = false
 do {
  try VNImageRequestHandler(url:url).perform([request])
  let labels=(request.results ?? []).compactMap { item -> [String:Any]? in
   guard let value=item.topCandidates(1).first else{return nil}
   let r=item.boundingBox
   return ["text":value.string,"x":r.minX,"y":1-r.maxY,"width":r.width,"height":r.height,"confidence":value.confidence]
  }
  output.append(["path":path,"labels":labels])
 } catch { output.append(["path":path,"error":String(describing:error)]) }
}
let data=try JSONSerialization.data(withJSONObject:output,options:[.prettyPrinted,.sortedKeys])
print(String(data:data,encoding:.utf8)!)
