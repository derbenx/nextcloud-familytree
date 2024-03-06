<div id="app-content">
<!--
    Ftree is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    Ftree is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with Ftree. If not, see <https://www.gnu.org/licenses/>. 
-->
<canvas id='can'></canvas>
<div id='inp'>
<table>
<tr><td id='t1'><b>Tree name:</b></td><td><input class='inp' id='t' value='My family'></td><td id='t24'><center>ID Lines: select id pair and set relation on left.</center></td></tr>
<tr><td id='t2'>Given names:</td><td><input class='inp' id='g'></td><td class='lin' rowspan='6'><select size='8' id='ln'></select><textarea id='hp' readonly></textarea></td></tr>
<tr><td id='t3'>Family name:</td><td><input class='inp' id='f'></td></tr>
<tr><td id='t4'>Gender:</td><td>
<select id="s">
 <option id='t10' value="0">Female</option>
 <option id='t11' value="1">Male</option>
 <option id='t12' value="2">Both</option>
 <option id='t13' value="3">None</option>
</select>
</td></tr>
<tr><td id='t5'>Birth:</td><td><input class='inp' id='b'></td></tr>
<tr><td id='t6'>Death:</td><td><input class='inp' id='d'></td></tr>
<tr><td id='t7'>Other info:</td><td><textarea class='inp' id='o'></textarea></td></tr>
<tr><td id='t8'>Relation:</td><td>
<select id="r">
 <option id='t14' value="0">Choose</option>
 <option id='t15' value="1">Married > Red</option>
 <option id='t16' value="2">Parental > Green</option>
 <option id='t17' value="3">Siblings > Blue</option>
 <option id='t18' value="4">Adopted > Orange</option>
 <option id='t19' value="5">Divorced > Yellow</option>
 <option id='t20' value="6">Unwed parents > Grey</option>
</select>
</td><td><font id='t23'>Translate: </font><select id="lang">
</select></td></tr>
<tr><td id='t9'>Buttons:</td><td><button id="addPer" disabled>New Person</button><button id="updPer" disabled>Update Selected</button><button id="delPer" disabled>Delete Selected</button>
<button id='t22'>Select multiple</button>
</td><td><font id='t21'>Background colour:</font><select id='bg'><option id='t25'>Black</option><option id='t26'>White</option></select></td></tr>
</table>
<button id='fu'>Fullscreen</button>
<button id='nt'>New Tree</button>
<button id='st'>Save Tree</button>
<button id='lt'>Load Tree</button>
<button id="cent">Center Tree</button>
<button id='imp'>Import GED</button>
<button id='sos'>Help</button>
[<font id='ver'></font>]<br>
</div>
<hr id="hr">
<button id='sh'>Hide</button>
</div>