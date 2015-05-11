;var Voo = function(a,b){
	this.voo = {
		voo : {
			core: {
				__: null,
				i: null,
				p: 0,
				t: 0,
				state: 'idle',
				cfg: {
					src: 'http://cs1-28v4.vk-cdn.net/p20/312079bb99a36b.mp3',
					preload: 'metadata',
					loop: false,
					autoplay: false
				},
				redraw: function(c){
					if(b!==undefined){
						$(b).children(':first').css('width',c.p+'%');
					}
				}
			},
			state: function(){
				return this.core.state;
			},
			slider: function(o){
				var v = this;
				$(o).first().on('click',function(evt){
					v.position((evt.pageX - $(this).offset().left)/$(this).width()*100,v.core);
				});
				return o;
			},
			play: function(){
				var core = this.core;
				core.__.play();
				clearInterval(core.i);
				core.state = 'play';
				core.i = setInterval(function(){
					core.p = (core.__.currentTime/core.__.duration)*100;
					core.t = core.__.currentTime;
					core.redraw(core);
					if(core.p==100){clearInterval(core.i);core.state = 'end';}
				},100);
				return true;
			},
			pause: function(p){
				this.core.__.pause();
				if(p!==undefined){
					if(p<1){this.position(0,this.core);this.core.__.currentTime = 0;this.core.state = 'stop';}
					else{this.core.__.currentTime = (this.core.__.duration/100)*p;this.core.state = 'pause';}
				}
				else{this.core.state = 'pause';}
				clearInterval(this.core.i);
				return true;
			},
			position: function(p,c){
				var core = c || this.core;
				if(p!==undefined){
					core.__.currentTime = (core.__.duration/100)*p;
					core.p = (core.__.currentTime/core.__.duration)*100;
					core.t = core.__.currentTime;
					core.redraw(core);
					return core.p;
				}else{
					return core.p;
				}
			}
		}
	}

	this.voo.voo.core.__ = new Audio();
	this.voo.voo.core.__.preload = (a!==undefined)? a.preload || this.voo.voo.core.cfg.preload : this.voo.voo.core.cfg.preload;
	this.voo.voo.core.__.autoplay = (a!==undefined)? a.autoplay || this.voo.voo.core.cfg.autoplay : this.voo.voo.core.cfg.autoplay;
	this.voo.voo.core.__.loop = (a!==undefined)? a.loop || this.voo.voo.core.cfg.loop : this.voo.voo.core.cfg.loop;
	this.voo.voo.core.__.src = (a!==undefined)? a.src || this.voo.voo.core.cfg.src : this.voo.voo.core.cfg.src;
	(b!==undefined)? this.voo.voo.slider(b) : this.voo.voo.slider(false);
	return this.voo;
}
