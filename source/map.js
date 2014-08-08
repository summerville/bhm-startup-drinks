var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
    //init data
    
    var json = {
      id: "1",
      name: "Your Company",
      data: {
	description:  "Description blah blah",
        link:  "http://www.google.com"
      },
      children: [
          {
          id: "2",
          name: "Financing",
          data: {
            description:  "Description of financing blah",
            link:  "http://www.financing.com"
          },
          children: [{
              id: "3",
              name: "Banks",
              data: {
                description:  "Description of banks blah",
                link:  "http://www.banks.com"
              },
              children:  []
          },  {
              id:  "4",
              name:  "Angel Investors",
              data:  {
                description:  "Description of angel investors blah",
                link:  "http://www.angelinvestors.com"
              },
              children:  []
          }]
          },
          {
          id: "5",
          name: "Support System",
          data: {
            description:  "Description of support blah",
            link:  "http://www.support.com"
          },
          children: [{
              id: "6",
              name: "Lawyers",
              data: {
                description:  "Description of lawyers blah",
                link:  "http://www.lawyers.com"
              },
              children:  []
          },  {
              id:  "7",
              name:  "Accountants",
              data:  {
                description:  "Description of accountants blah",
                link:  "http://www.accountants.com"
              },
              children:  []
          }]
          },
          {
          id: "8",
          name: "Community",
          data: {
            description:  "Description of community blah",
            link:  "http://www.support.com"
          },
          children: [{
              id: "9",
              name: "TechBirmingham",
              data: {
                description:  "Description of TechBirmingham",
                link:  "http://www.TechBirmingham.com"
              },
              children:  [{
                id: "11",
                name:  "TechMixer",
                data:  {
                  description:  "TechMixer",
                  link:  "http://www.TechMixer.com"
                }
                }]
          },  {
              id:  "10",
              name:  "Birmingham Startup Drinks",
              data:  {
                description:  "Description of Birmingham Startup Drinks",
                link:  "http://www.BHMStartupDrinks.com"
              },
              children:  []
          }]
          }
          
      ]
    };

    //end
    
    //init RGraph
    var rgraph = new $jit.RGraph({
        //Where to append the visualization
        injectInto: 'infovis',
 
        //Optional: create a background canvas that plots
        //concentric circles.
        //background: {
        //  CanvasStyles: {
        //    strokeStyle: '#FF28F7'
        //  }
        //},
 
        //Add navigation capabilities:
        //zooming by scrolling and panning.
        Navigation: {
          enable: true,
          panning: true,
          zooming: 200
        },
 
        //Set Node and Edge styles.
        Node: {
            color: '#000CFF'
        },
        
        Edge: {
          color: '#CCFFD1',
          lineWidth:1.5
        },
        
        onBeforeCompute: function(node){
            //Log.write("centering " + node.name + "...");
            //Add the description into the right column.
            //This list is taken from the data property of each JSON node.
            $jit.id('inner-details').innerHTML = "<h4>" + node.name + "</h4>" + "<div>" + node.data.description + "</div><br>" + "<a href=\"" + node.data.link + "\"  target=\"_new\">Go to website</a>";
        },
        
        //Add the name of the node in the correponding label
        //and a click handler to move the graph.
        //This method is called once, on label creation.
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            domElement.onclick = function(){
                rgraph.onClick(node.id, {
                    onComplete: function() {
                        //Log.write(node.name + " is centered");
                    }
                });
            };
        },
        //Change some label dom properties.
        //This method is called each time a label is plotted.
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            style.display = '';
            style.cursor = 'pointer';

            if (node._depth <1) {
                style.fontSize = "1.3em";
                style.color = "#000000";
                style.fontWeight = 'bold';
            
            } else if(node._depth == 1) {
                style.fontSize = "1.0em";
                style.color = "#969696";
                        
            } else if(node._depth >= 2){
                style.fontSize = "0.7em";
                style.color = "#CCCCCC";
            
            } else {
                style.display = 'none';
            }

            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        }
    });
    //load JSON data
    rgraph.loadJSON(json);
    //trigger small animation
    rgraph.graph.eachNode(function(n) {
      var pos = n.getPos();
      pos.setc(-200, -200);
    });
    rgraph.compute('end');
    rgraph.fx.animate({
      modes:['polar'],
      duration: 1000
    });
    //end
    //append information about the root in the right column
    $jit.id('inner-details').innerHTML = "Click on any node of the map to find out more information about resources.";  //rgraph.graph.getNode(rgraph.root).data.description;
}
